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

// Ciclo que se repite hasta que se ingrese un número válido de jugadores
while (true) {
  jugadoresA = parseInt(
    prompt("Ingrese el número de jugadores de " + equipoA.nombre + ":")
  );
  if (isNaN(jugadoresA) || jugadoresA <= 0 || jugadoresA > 11) {
    alert("El número de jugadores debe ser un número entre 1 y 11.");
  } else {
    break; // Salir del ciclo si el número es válido
  }
}

for (let i = 0; i < jugadoresA; i++) {
  const jugador = "Jugador" + (i + 1);
  equipoA.jugadores.push(jugador);
}
console.log(equipoA.jugadores);
// Ciclo que no permite ingresar un número de jugadores negativo, no numérico y mayor que 11

while (true) {
  jugadoresB = parseInt(
    prompt("Ingrese el número de jugadores de " + equipoB.nombre + ":")
  );
  if (isNaN(jugadoresB) || jugadoresB <= 0 || jugadoresB > 11) {
    alert("El número de jugadores debe ser un número entre 1 y 11.");
    jugadoresB = parseInt(
      prompt("Ingrese el número de jugadores de " + equipoB.nombre + ":")
    );
  } else {
    break;
  }
}

for (let i = 0; i < jugadoresB; i++) {
  const jugador = "Jugador" + (i + 1);
  equipoB.jugadores.push(jugador);
}
console.log(equipoB.jugadores);

function simularPartido() {
  golesA = Math.floor(Math.random() * 6); // Goles aleatorios entre 0 y 5
  golesB = Math.floor(Math.random() * 6); // Goles aleatorios entre 0 y 5
  if (golesA > golesB) {
    alert(`${equipoA.nombre} gana el partido`);
  } else if (golesB > golesA) {
    alert(`${equipoB.nombre} gana el partido`);
  } else {
    alert("El partido termina en empate");
  }
  console.log(
    `Resultado del partido: ${equipoA.nombre} ${golesA} - ${golesB} ${equipoB.nombre}`
  );
  return `${equipoA.nombre} ${golesA} - ${golesB} ${equipoB.nombre}`;
}
