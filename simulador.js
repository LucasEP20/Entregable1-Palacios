let equipoA = {};
let equipoB = {};
let golesA = 0;
let golesB = 0;

// Esta función se encarga de la lógica de simulación
const simularPartido = () => {
  golesA = Math.floor(Math.random() * 6); // Goles aleatorios entre 0 y 5
  golesB = Math.floor(Math.random() * 6); // Goles aleatorios entre 0 y 5

  const goleadoresA = [];
  const goleadoresB = [];

  // Asigna goleadores aleatorios para el Equipo A
  for (let i = 0; i < golesA; i++) {
    if (equipoA.jugadores.length > 0) {
      const indiceAleatorio = Math.floor(
        Math.random() * equipoA.jugadores.length
      );
      goleadoresA.push(equipoA.jugadores[indiceAleatorio]);
    }
  }

  // Asigna goleadores aleatorios para el Equipo B
  for (let i = 0; i < golesB; i++) {
    if (equipoB.jugadores.length > 0) {
      const indiceAleatorio = Math.floor(
        Math.random() * equipoB.jugadores.length
      );
      goleadoresB.push(equipoB.jugadores[indiceAleatorio]);
    }
  }
  // Retorna el resultado del partido
  return {
    resultado: `${equipoA.nombre} ${golesA} - ${golesB} ${equipoB.nombre}`,
    goleadoresA: goleadoresA,
    goleadoresB: goleadoresB,
  };
};

// Esta función maneja la entrada de datos del usuario y el flujo de la simulación
const iniciarSimulacion = () => {
  equipoA = {
    nombre: prompt("Ingrese el nombre del Equipo A:"),
    jugadores: [],
  };

  equipoB = {
    nombre: prompt("Ingrese el nombre del Equipo B:"),
    jugadores: [],
  };

  let numJugadoresA = parseInt(
    prompt("Ingrese el número de jugadores de " + equipoA.nombre + ":")
  );

  while (isNaN(numJugadoresA) || numJugadoresA <= 0 || numJugadoresA > 11) {
    alert("El número de jugadores debe ser un número entre 1 y 11.");
    numJugadoresA = parseInt(
      prompt("Ingrese el número de jugadores de " + equipoA.nombre + ":")
    );
  }

  for (let i = 0; i < numJugadoresA; i++) {
    const jugador = "Jugador " + (i + 1);
    equipoA.jugadores.push(jugador);
  }

  console.log(equipoA.jugadores);

  let numJugadoresB = parseInt(
    prompt("Ingrese el número de jugadores de " + equipoB.nombre + ":")
  );

  while (isNaN(numJugadoresB) || numJugadoresB <= 0 || numJugadoresB > 11) {
    alert("El número de jugadores debe ser un número entre 1 y 11.");
    numJugadoresB = parseInt(
      prompt("Ingrese el número de jugadores de " + equipoB.nombre + ":")
    );
  }

  for (let i = 0; i < numJugadoresB; i++) {
    const jugador = "Jugador " + (i + 1);
    equipoB.jugadores.push(jugador);
  }
  console.log(equipoB.jugadores);

  // Llamada a la función de simulación y renderizado de resultados
  const resultadoPartido = simularPartido();
  document.getElementById("resultado").innerText = resultadoPartido.resultado;

  const listaJugadoresA = obtenerJugadores(equipoA);
  renderizarListaJugadores(listaJugadoresA, "jugadoresEquipoA");

  const listaJugadoresB = obtenerJugadores(equipoB);
  renderizarListaJugadores(listaJugadoresB, "jugadoresEquipoB");

  renderizarListaJugadores(resultadoPartido.goleadoresA, "goleadoresEquipoA");
  renderizarListaJugadores(resultadoPartido.goleadoresB, "goleadoresEquipoB");

  //Guardar el historial de partidos en local storage
  let historial = JSON.parse(localStorage.getItem("historialPartidos")) || [];
  historial.push(resultadoPartido.resultado);
  localStorage.setItem("historialPartidos", JSON.stringify(historial));
};

// Agrega un escuchador de eventos al botón para iniciar el proceso
document.addEventListener("DOMContentLoaded", () => {
  const botonIniciar = document.getElementById("iniciarSimulacionBtn");
  if (botonIniciar) {
    botonIniciar.addEventListener("click", iniciarSimulacion);
  }
});
