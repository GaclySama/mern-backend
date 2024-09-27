import { Router } from 'express';
import { check } from 'express-validator';


import { 
  getEvents, createEvent, updateEvent, deleteEvent 
} from '../controllers/eventsController.js';
import { validateJWT } from '../middlewares/validate-jwt.js';
import { fieldValidate } from '../middlewares/field-validators.js';
import { isDate } from '../helpers/isDate.js';

export const EventsRouter = Router();

EventsRouter.use( validateJWT );

// Obtener todos los eventos
EventsRouter.get('/', getEvents );


// Crear un nuevo evento
EventsRouter.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
    fieldValidate
  ], 
  createEvent );


// Actualizar evento
EventsRouter.put('/:id', updateEvent );



// Borrar evento
EventsRouter.delete('/:id', deleteEvent );