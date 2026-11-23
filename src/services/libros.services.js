import * as repository from '../repositories/libros.repository.js';

function errorHttp(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function parsearId(id) {
  const n = Number(id);
  if (!Number.isInteger(n) || n <= 0) {
    throw errorHttp(400, 'El id debe ser un número entero positivo');
  }
  return n;
}

function validarDatos({ titulo, autor, año }) {
  if (typeof titulo !== 'string' || titulo.trim() === '') {
    throw errorHttp(400, 'El título es obligatorio');
  }
  if (typeof autor !== 'string' || autor.trim() === '') {
    throw errorHttp(400, 'El autor es obligatorio');
  }
  const anio = Number(año);
  if (año === undefined || año === '' || !Number.isInteger(anio)) {
    throw errorHttp(400, 'El año es obligatorio y debe ser un número entero');
  }
  return { titulo: titulo.trim(), autor: autor.trim(), año: anio };
}

export function obtenerTodos() {
  return repository.obtenerTodos();
}

export function obtenerPorId(id) {
  const libro = repository.obtenerPorId(parsearId(id));
  if (!libro) throw errorHttp(404, 'Libro no encontrado');
  return libro;
}

export function crear(datos) {
  const libro = validarDatos(datos || {});
  return repository.crear(libro);
}

export function actualizar(id, datos) {
  const idNum = parsearId(id);
  const libro = validarDatos(datos || {});
  const actualizado = repository.actualizar(idNum, libro);
  if (!actualizado) throw errorHttp(404, 'Libro no encontrado');
  return actualizado;
}

export function eliminar(id) {
  const eliminado = repository.eliminar(parsearId(id));
  if (!eliminado) throw errorHttp(404, 'Libro no encontrado');
  return eliminado;
}

