import express from 'express';
import 'dotenv/config' 
import cors from 'cors'

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


// Lectura ya parseo del body
app.use( express.json() );


// ! Rutas 
/* Auth */ app.use('/api/auth', AuthRouter );
/* Events */ app.use('/api/events', EventsRouter );

app.listen( process.env.PORT, () => {
  console.log(`Server up in port ${ process.env.PORT }`)
})

