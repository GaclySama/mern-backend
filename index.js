import express from 'express';
import 'dotenv/config' 
import cors from 'cors'

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { AuthRouter } from './routes/authRoutes.js';
import { dbConnection } from './database/config.js';
import { EventsRouter } from './routes/eventsRoutes.js';

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio Público
app.use( express.static('public') )


// Lectura y parseo del body
app.use( express.json() );


// ! Rutas 
/* Auth */ app.use('/api/auth', AuthRouter );
/* Events */ app.use('/api/events', EventsRouter );

app.use( '*', ( req, res ) => {
  res.sendFile( path.join( __dirname, 'public/index.html') );
});


app.listen( process.env.PORT, () => {
  console.log(`Server up in port ${ process.env.PORT }`)
})

