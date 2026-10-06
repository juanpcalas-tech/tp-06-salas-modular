function prepararAreaReservas(req, res, next) {
  res.locals.seccion = "Reserva de Salas";
  next();
}
function validarDatosReserva(req, res, next) {
  const valores = req.body ?? {};
  const estudiante = String(valores.estudiante ?? "").trim();
  const email = String(valores.email ?? "").trim();
  const fecha = String(valores.fecha ?? "").trim();
  const turno = String(valores.turno ?? "").trim();
  const sala = String(valores.sala ?? "").trim();
  const personas = Number(valores.personas);

  const salasDisponibles = ["Sala Norte", "Sala Sur", "Sala Multimedia"];
  const turnosDisponibles = ["Mañana", "Tarde", "Noche"];

  if (!email.includes("@")) {
    return res.status(400).render("reservas/nueva", {
      titulo: "Nueva Reserva",
      error: "El correo electrónico debe contener el carácter '@'.",
      valores: {
        estudiante,
        email,
        fecha,
        turno,
        sala,
        personas: req.body.personas,
      },
    });
  }

  const DatosValidos =
    estudiante &&
    email.includes("@") &&
    fecha &&
    turnosDisponibles.includes(turno) &&
    salasDisponibles.includes(sala) &&
    Number.isInteger(personas) &&
    personas > 0 &&
    personas <= 6;
  if (!DatosValidos) {
    return res.status(400).render("reservas/nueva", {
      titulo: "Nueva Reserva",
      error:
        "Datos inválidos. Por favor, complete todos los campos correctamente.",
      valores,
    });
  }
  req.reservaValidada = {
    estudiante,
    email,
    fecha,
    turno,
    sala,
    personas,
  };
  next();
}

module.exports = { prepararAreaReservas, validarDatosReserva };
