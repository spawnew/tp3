import * as service from '../services/libros.services.js';

function manejarError(res, error) {
  if (error.status) {
    return res.status(error.status).json({ error: error.message });
  }
  console.error(error);
  return res.status(500).json({ error: 'Error interno del servidor' });
}

export function obtenerTodos(req, res) {
  try {
    res.status(200).json(service.obtenerTodos());
  } catch (error) {
    manejarError(res, error);
  }
}

export function obtenerPorId(req, res) {
  try {
    res.status(200).json(service.obtenerPorId(req.params.id));
  } catch (error) {
    manejarError(res, error);
  }
}

export function crear(req, res) {
  try {
    const libro = service.crear(req.body);
    res.status(201).json(libro);
  } catch (error) {
    manejarError(res, error);
  }
}

export function actualizar(req, res) {
  try {
    res.status(200).json(service.actualizar(req.params.id, req.body));
  } catch (error) {
    manejarError(res, error);
  }
}

export function eliminar(req, res) {
  try {
    res.status(200).json(service.eliminar(req.params.id));
  } catch (error) {
    manejarError(res, error);
  }
}

