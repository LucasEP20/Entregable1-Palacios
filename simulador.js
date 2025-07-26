let equipoA = {
  nombre: prompt("Ingrese el nombre del Equipo A:"),
  jugadores: [],
};

let equipoB = {
  nombre: prompt("Ingrese el nombre del Equipo B:"),
  jugadores: [],
};

let golesA = 0;
let golesB = 0;

let jugadoresA = parseInt(
  prompt("Ingrese el número de jugadores de " + equipoA.nombre + ":")
);

while (isNaN(jugadoresA) || jugadoresA <= 0 || jugadoresA > 11) {
  alert("El número de jugadores debe ser un número entre 1 y 11.");
  jugadoresA = parseInt(
    prompt("Ingrese el número de jugadores de " + equipoA.nombre + ":")
  );
}

for (let i = 0; i < jugadoresA; i++) {
  const jugador = "Jugador " + (i + 1);
  equipoA.jugadores.push(jugador);
}
console.log(equipoA.jugadores);

let jugadoresB = parseInt(
  prompt("Ingrese el número de jugadores de " + equipoB.nombre + ":")
);

while (isNaN(jugadoresB) || jugadoresB <= 0 || jugadoresB > 11) {
  alert("El número de jugadores debe ser un número entre 1 y 11.");
  jugadoresB = parseInt(
    prompt("Ingrese el número de jugadores de " + equipoB.nombre + ":")
  );
}

for (let i = 0; i < jugadoresB; i++) {
  const jugador = "Jugador " + (i + 1);
  equipoB.jugadores.push(jugador);
}
console.log(equipoB.jugadores);

// Función simularPartido
const simularPartido = () => {
  golesA = Math.floor(Math.random() * 6); // Goles aleatorios entre 0 y 5
  golesB = Math.floor(Math.random() * 6); // Goles aleatorios entre 0 y 5

  const goleadoresA = [];
  const goleadoresB = [];

  // Asignar goleadores aleatorios para el Equipo A
  for (let i = 0; i < golesA; i++) {
    if (equipoA.jugadores.length > 0) {
      const indiceAleatorio = Math.floor(
        Math.random() * equipoA.jugadores.length
      );
      goleadoresA.push(equipoA.jugadores[indiceAleatorio]);
    }
  }

  // Asignar goleadores aleatorios para el Equipo B
  for (let i = 0; i < golesB; i++) {
    if (equipoB.jugadores.length > 0) {
      const indiceAleatorio = Math.floor(
        Math.random() * equipoB.jugadores.length
      );
      goleadoresB.push(equipoB.jugadores[indiceAleatorio]);
    }
  }
  // Retornar el resultado del partido
  return {
    resultado: `${equipoA.nombre} ${golesA} - ${golesB} ${equipoB.nombre}`,
    goleadoresA: goleadoresA,
    goleadoresB: goleadoresB,
  };
};
