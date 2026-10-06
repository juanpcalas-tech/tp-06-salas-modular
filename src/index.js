/*const path = require("node:path");*/
const { leerConfiguracion } = require("./configuracion");
const { crearServicioreservas } = require("./servicios/reservas");
const { crearApp } = require("./app");
/*const PORT = 3000;*/

async function main() {
  const { puerto, formatoRegistro } = leerConfiguracion();
  const reservasIniciales = [
    {
      id: 1,
      estudiante: "Carlos Mendoa",
      email: "carlos.mendoza@universidad.edu",
      sala: "Sala Norte",
      fecha: "2026-09-23",
      turno: "Mañana",
      personas: 4,
    },
    {
      id: 2,
      estudiante: "Ana María Silva",
      email: "ana.silva@universidad.edu",
      sala: "Sala Multimedia",
      fecha: "2026-09-23",
      turno: "Tarde",
      personas: 6,
    },
    {
      id: 3,
      estudiante: "Mateo Rodríguez",
      email: "mateo.rod@universidad.edu",
      sala: "Sala Sur",
      fecha: "2026-09-24",
      turno: "Noche",
      personas: 2,
    },
    {
      id: 4,
      estudiante: "Sofía Benítez",
      email: "sofia.b@universidad.edu",
      sala: "Sala Norte",
      fecha: "2026-09-25",
      turno: "Tarde",
      personas: 1,
    },
  ];
  const servicioReservas = crearServicioreservas(reservasIniciales);
  const app = crearApp({ servicioReservas, formatoRegistro });

  app.listen(puerto, () => {
    console.log(`Aplicación disponible en http://localhost:${puerto}`);
  });
}

main().catch((error) => {
  console.error("No se pudo iniciar la aplicación:", error);
  process.exitCode = 1;
});
