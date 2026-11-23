const libros = [];
let proximoId = 1;

export function obtenerTodos() {
  return libros;
}

export function obtenerPorId(id) {
  return libros.find((l) => l.id === id);
}

export function crear({ titulo, autor, año }) {
  const libro = { id: proximoId++, titulo, autor, año };
  libros.push(libro);
  return libro;
}

export function actualizar(id, { titulo, autor, año }) {
  const libro = obtenerPorId(id);
  if (!libro) return null;
  libro.titulo = titulo;
  libro.autor = autor;
  libro.año = año;
  return libro;
}

export function eliminar(id) {
  const indice = libros.findIndex((l) => l.id === id);
  if (indice === -1) return null;
  return libros.splice(indice, 1)[0];
}

