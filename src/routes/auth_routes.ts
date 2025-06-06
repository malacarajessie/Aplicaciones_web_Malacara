import { Router } from "express";
import { deleteUser, getAllUsers, getTimeToken, getUserByUsername, login, saveUser, updateToken, updateUser } from "../controllers/auth_controller";

const router = Router();

router.post('/login', login);
router.get('/getTime/:Id', getTimeToken);
router.patch('/update/:Id', updateToken);
router.get('/users', getAllUsers);
router.post('/users', saveUser);
router.get('/users/name/:userName', getUserByUsername);
router.patch('/users/:userId', updateUser);
router.delete('/users/:userId', deleteUser);

/*
    Utiliza el endpoint 
*/
export default router;
