import { Request, Response } from 'express';

// Endpoint recibe un request, responde un response
export const login = (req: Request, res: Response) => {
    let number: number = 1;

    const { username, password } = req.body;

    if (username !== "admin" || password !== "12345") {
        return res.status(401).json({ message: "Credenciales incorrectas" });
    } else {
        return res.json({ message: "Login exitoso" });
    }
};
