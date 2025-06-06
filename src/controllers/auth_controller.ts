import { Request, Response } from 'express';
import { generateAccessToken } from '../utils/generateTokens';
import dayjs from 'dayjs';
import NodeCache from 'node-cache';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';

const cache = new NodeCache();

// Endpoint: login
export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        // Validar contraseña cifrada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        const userId = user._id.toString();
        const accessToken = generateAccessToken(userId);

        // Guardar token en caché por 15 minutos
        cache.set(userId, accessToken, 60 * 15);

        return res.json({ message: "Login exitoso", accessToken });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};

// Endpoint: getTimeToken
export const getTimeToken = (req: Request, res: Response) => {
    const { Id } = req.params;
    const ttl = cache.getTtl(Id);

    if (!ttl) {
        return res.status(404).json({ message: "Token no encontrado" });
    }

    const now = Date.now();
    const timeToLifeSecond = Math.floor((ttl - now) / 1000);
    const exTime = dayjs(ttl).format('HH:mm:ss');

    return res.json({ timeToLifeSecond, exTime });
};

// Endpoint: updateToken
export const updateToken = (req: Request, res: Response) => {
    const { Id } = req.params;
    const ttl = cache.getTtl(Id);

    if (!ttl) {
        return res.status(404).json({ message: "Token no encontrado" });
    }

    const newTime: number = 60 * 15;
    cache.ttl(Id, newTime);

    return res.json({ message: "Actualización con éxito" });
};

// Obtener todos los usuarios
export const getAllUsers = async (req: Request, res: Response) => {
    const userList = await User.find();
    return res.json({ userList });
};

// Obtener usuario por username

export const getUserByUsername = async (req: Request, res: Response) => {
    const { userName } = req.params;
    const userByUsername = await User.find({ username: userName });

    if (!userByUsername || userByUsername.length === 0) {
        return res.status(404).json({ message: "Usuario no existe" });
    }

    return res.json({ userByUsername });
};


// Guardar usuario nuevo

export const saveUser = async (req: Request, res: Response) => {
    try {
        const { name, userName, email, phone, password, role, status } = req.body;

        // Cifrar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            username: userName,
            email,
            phone,
            password: hashedPassword,
            role,
            status
        });

        const user = await newUser.save();
        return res.json({ user });
    } catch (error) {
        console.log("Error ocurrido en saveUser:", error);
        return res.status(500).json({ message: "Error al guardar el usuario" });
    }
};

// Actualizar usuario

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { emailUser, phone, password, role, name } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const existingUser = await User.findOne({ email: emailUser });
        if (existingUser && existingUser._id.toString() !== userId) {
            return res.status(409).json({ message: "Este correo ya está registrado por otro usuario" });
        }

        user.email = emailUser;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }
        user.role = role;
        user.phone = phone;
        user.name = name;

        const updatedUser = await user.save();
        return res.json({ updatedUser });

    } catch (error) {
        console.log("Error en updateUser:", error);
        return res.status(500).json({ message: "Error al actualizar el usuario", error });
    }
};


// Eliminar usuario (lógico)

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        user.status = false;
        user.deleteDate = new Date();

        await user.save();

        return res.json({ message: "Eliminación exitosa" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error del servidor" });
    }
};
