/* 
  Rutas de Usuarios / Auth
  host + /api/auth
*/

import { Router } from 'express';
import { check } from 'express-validator';

import { fieldValidate } from '../middlewares/field-validators.js';
import { loginUser, createUser, revalidateToken } from '../controllers/authController.js';
import { validateJWT } from '../middlewares/validate-jwt.js';
export const AuthRouter = Router();


// * CREAR
AuthRouter.post(
  '/new', 
  [ //MIDDLEWARES
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de 6 digitos').isLength({ min: 6 }),
    fieldValidate,
  ],
  createUser
);


// * lOGIN
AuthRouter.post(
  '/', 
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de 6 digitos').isLength({ min: 6 }),
    fieldValidate,
  ], 
  loginUser 
);

// * TOKEN
AuthRouter.get('/renew', validateJWT, revalidateToken );