import { response } from 'express';
import bcrypt from 'bcryptjs';

import { UserModel } from '../models/User.js';
import { generarJWT } from '../helpers/jwt.js'


export const createUser = async ( req, res = response ) => {

  const { email, password } = req.body;
  
  try {
    let user = await UserModel.findOne({ email });

    if ( user ) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya ha un usuario con este email'
      });
    };

    user = new UserModel( req.body );

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );
  
    await user.save();

    // Generar JWT
    const token = await generarJWT( user.id, user.name );
  
    return res.status(201).json({ 
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });

  } catch (error) {

    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });
  }
};



export const loginUser = async ( req, res = response ) => {

  const { email, password } = req.body;


  try {
    let user = await UserModel.findOne({ email });

    if ( !user ) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe con ese email'
      });
    };

    // Confirmar los passwords
    const validPassword = bcrypt.compareSync( password, user.password );

    if ( !validPassword ) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto'
      });
    }

    // Generar JWT
    const token = await generarJWT( user.id, user.name );
    
    return res.status(200).json({ 
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });
  }
};


export const revalidateToken = async ( req, res = response ) => {

  const { uid, name } = req;

  const token = await generarJWT( uid, name );

  console.log(token);

  return res.json({ 
    ok: true,
    token
  });
}
