import { response } from 'express';
import { EventModel } from '../models/Events.js';


export const getEvents = async ( req, res = response ) => {

  const events = await EventModel.find()
                                    .populate('user', 'name');

  return res.status(200).json({
    ok: true,
    events
  });
};


export const createEvent = async ( req, res = response ) => {

  // Verificar que tenga el evento
  const event = new EventModel( req.body );

  try {

    event.user = req.uid;

    const eventSaved = await event.save();

    return res.status(201).json({
      ok: true,
      event: eventSaved
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Hable con su chingada madre'
    });
  }
};


export const updateEvent = async ( req, res = response ) => {

  const eventId = req.params.id;
  const uid = req.uid;

  try {

    const event = await EventModel.findById( eventId );

    if ( !event ) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese id'
      });
    }

    if ( event.user.toString() !== uid ) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de editar este evento'
      });
    };


    const newEvent = {
      ...req.body,
      user: uid
    };

    const eventUpdated = await EventModel.findByIdAndUpdate( eventId, newEvent, { new: true} );

    return res.status(200).json({
      ok: true,
      event: eventUpdated
    });
    
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
};


export const deleteEvent = async ( req, res = response ) => {

  const eventId = req.params.id;
  const uid = req.uid;

    try {

    const event = await EventModel.findById( eventId );

    if ( !event ) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese id'
      });
    }

    if ( event.user.toString() !== uid ) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de eliminar este evento'
      });
    };

    await EventModel.findByIdAndDelete( eventId );

    return res.status(200).json({
      ok: true,
    });
    
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
};