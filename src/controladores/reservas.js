function crearControladorReservas(servicioReservas) {
  function listar(req, res) {
    res.render("reservas/lista", {
      titulo: "Reserva de Salas",
      reservas: servicioReservas.listar(),
    });
  }
  function mostrarFormulario(req, res) {
    res.render("reservas/nueva", {
      titulo: "Nueva reserva",
      error: null,
      valores: {},
    });
  }
  function mostrarDetalle(req, res) {
    const id = Number(req.params.id);
    const reserva = servicioReservas.obtenerPorId(id);
    if (!reserva) {
      return res.status(404).render("no-encontrado", {
        titulo: "Reserva No encontrada",
        mensaje: "No existe una Reserva con ese Id.",
      });
    }
    res.render("reservas/detalle", {
      titulo: reserva.estudiante,
      reserva,
    });
  }
  function crear(req, res) {
    servicioReservas.crear(req.reservaValidada);
    res.redirect("/reservas");
  }

  function listarApi(req, res) {
    res.json(servicioReservas.listar());
  }
  return { listar, mostrarFormulario, mostrarDetalle, crear, listarApi };
}
module.exports = { crearControladorReservas };
