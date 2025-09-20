// Variable para almacenar los datos de los equipos cargados desde el JSON
let equiposDisponibles = [];
let equipoA = {};
let equipoB = {};

// Esta función se encarga de la lógica de simulación
const simularPartido = () => {
  let golesA = Math.floor(Math.random() * 6); // Goles aleatorios entre 0 y 5
  let golesB = Math.floor(Math.random() * 6); // Goles aleatorios entre 0 y 5

  const goleadoresA = [];
  const goleadoresB = [];

  // Asigna goleadores aleatorios para el Equipo A
  for (let i = 0; i < golesA; i++) {
    if (equipoA.jugadores && equipoA.jugadores.length > 0) {
      const indiceAleatorio = Math.floor(
        Math.random() * equipoA.jugadores.length
      );
      goleadoresA.push(equipoA.jugadores[indiceAleatorio]);
    }
  }

  // Asigna goleadores aleatorios para el Equipo B
  for (let i = 0; i < golesB; i++) {
    if (equipoB.jugadores && equipoB.jugadores.length > 0) {
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

// Función para generar la interfaz de selección de equipos de forma dinámica
const generarInterfazSeleccion = () => {
  const mainContent = document.querySelector("main");
  mainContent.innerHTML = ""; // Limpia el contenido principal

  // Título de la sección
  const title = document.createElement("h2");
  title.textContent = "Selecciona tus equipos";
  mainContent.appendChild(title);

  // Contenedor para los selectores
  const formContainer = document.createElement("div");
  formContainer.classList.add("selector-container");

  // Selector del Equipo A
  const selectA = crearSelector(equiposDisponibles, "equipoA-select");
  formContainer.appendChild(crearDivSelector("Equipo Local", selectA));

  // Selector del Equipo B
  const selectB = crearSelector(equiposDisponibles, "equipoB-select");
  formContainer.appendChild(crearDivSelector("Equipo Visitante", selectB));

  mainContent.appendChild(formContainer);

  // Botón para iniciar la simulación
  const startBtn = document.createElement("button");
  startBtn.id = "iniciarSimulacionBtn";
  startBtn.textContent = "Simular Partido";
  mainContent.appendChild(startBtn);

  // Botón para agregar equipo
  const addTeamBtn = document.createElement("button");
  addTeamBtn.id = "agregarEquipoBtn";
  addTeamBtn.textContent = "Agregar nuevo equipo";
  addTeamBtn.addEventListener("click", generarInterfazAgregarEquipo);
  mainContent.appendChild(addTeamBtn);

  // Agrega el evento al nuevo botón
  startBtn.addEventListener("click", () => {
    const selectedA = equiposDisponibles.find(
      (e) => e.nombre === selectA.value
    );
    const selectedB = equiposDisponibles.find(
      (e) => e.nombre === selectB.value
    );

    // Valida que los equipos seleccionados sean diferentes
    if (selectedA && selectedB && selectedA.nombre !== selectedB.nombre) {
      equipoA = selectedA;
      equipoB = selectedB;
      iniciarSimulacion();
    } else {
      Swal.fire({
        title: "Error",
        text: "Por favor, selecciona dos equipos diferentes para la simulación.",
        icon: "error",
      });
    }
  });
};

// Función para generar la interfaz de agregar un nuevo equipo
const generarInterfazAgregarEquipo = () => {
  const mainContent = document.querySelector("main");
  mainContent.innerHTML = `
    <h2>Agregar Nuevo Equipo</h2>
    <form id="formAgregarEquipo">
      <div>
        <label for="nombreEquipo">Nombre del Equipo:</label>
        <input type="text" id="nombreEquipo" required>
      </div>
      <div>
        <label for="jugadoresEquipo">Jugadores (separados por comas):</label>
        <textarea id="jugadoresEquipo" required></textarea>
      </div>
      <button type="submit">Guardar Equipo</button>
      <button type="button" id="volverBtn">Volver</button>
    </form>
  `;

  // Añade evento para guardar el equipo
  document
    .getElementById("formAgregarEquipo")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = document.getElementById("nombreEquipo").value;
      const jugadoresTexto = document.getElementById("jugadoresEquipo").value;
      const jugadores = jugadoresTexto
        .split(",")
        .map((j) => j.trim())
        .filter((j) => j);

      if (nombre && jugadores.length > 0) {
        const nuevoEquipo = {
          nombre: nombre,
          jugadores: jugadores,
        };

        equiposDisponibles.push(nuevoEquipo);
        // Opcional: guardar en localStorage para persistencia
        localStorage.setItem(
          "equiposSimulador",
          JSON.stringify(equiposDisponibles)
        );

        Swal.fire({
          title: "¡Equipo Agregado!",
          text: `El equipo "${nombre}" ha sido añadido exitosamente.`,
          icon: "success",
        }).then(() => {
          generarInterfazSeleccion(); // Vuelve a la interfaz de selección
        });
      } else {
        Swal.fire("Error", "Por favor, completa todos los campos.", "error");
      }
    });

  // Añade evento para volver a la pantalla de selección
  document
    .getElementById("volverBtn")
    .addEventListener("click", generarInterfazSeleccion);
};

// Funciones auxiliares para crear elementos de la interfaz
const crearSelector = (equipos, id) => {
  const select = document.createElement("select");
  select.id = id;
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Selecciona un equipo";
  select.appendChild(defaultOption);

  equipos.forEach((equipo) => {
    const option = document.createElement("option");
    option.value = equipo.nombre;
    option.textContent = equipo.nombre;
    select.appendChild(option);
  });
  return select;
};

const crearDivSelector = (titulo, selector) => {
  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  h3.textContent = titulo;
  div.appendChild(h3);
  div.appendChild(selector);
  return div;
};

// Función para generar y mostrar los resultados del partido
const mostrarResultados = (resultadoPartido) => {
  const mainContent = document.querySelector("main");
  mainContent.innerHTML = ""; // Limpia el contenido anterior

  // HTML generado dinámicamente
  mainContent.innerHTML = `
    <h2>Resultado del Partido</h2>
    <p id="resultado">${resultadoPartido.resultado}</p>
    <section class="goleadores-container">
      <div>
        <h3>Goleadores Equipo A</h3>
        <div id="goleadoresEquipoA"></div>
      </div>
      <div>
        <h3>Goleadores Equipo B</h3>
        <div id="goleadoresEquipoB"></div>
      </div>
    </section>
    <section class="equipos-container">
      <div>
        <h3>Jugadores del Equipo A</h3>
        <div id="jugadoresEquipoA"></div>
      </div>
      <div>
        <h3>Jugadores del Equipo B</h3>
        <div id="jugadoresEquipoB"></div>
      </div>
    </section>
    <button id="reiniciarSimulacionBtn">Reiniciar Simulación</button>
  `;

  // Se reutilizan tus funciones de renderizado
  const listaJugadoresA = obtenerJugadores(equipoA);
  renderizarListaJugadores(listaJugadoresA, "jugadoresEquipoA");

  const listaJugadoresB = obtenerJugadores(equipoB);
  renderizarListaJugadores(listaJugadoresB, "jugadoresEquipoB");

  renderizarListaJugadores(resultadoPartido.goleadoresA, "goleadoresEquipoA");
  renderizarListaJugadores(resultadoPartido.goleadoresB, "goleadoresEquipoB");

  // Agrega el evento para reiniciar la simulación
  document
    .getElementById("reiniciarSimulacionBtn")
    .addEventListener("click", () => {
      generarInterfazSeleccion();
    });
};

// Función principal que inicia la simulación y el renderizado
const iniciarSimulacion = () => {
  Swal.fire({
    title: "Simulación iniciada",
    text: "El partido está en proceso.",
    icon: "info",
    timer: 2000,
    showConfirmButton: false,
    timerProgressBar: true,
  });

  const resultadoPartido = simularPartido();
  mostrarResultados(resultadoPartido);

  // Guarda el historial de partidos en local storage
  let historial = JSON.parse(localStorage.getItem("historialPartidos")) || [];
  historial.push(resultadoPartido.resultado);
  localStorage.setItem("historialPartidos", JSON.stringify(historial));
};

// Carga de datos remotos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const equiposGuardados = localStorage.getItem("equiposSimulador");
  if (equiposGuardados) {
    equiposDisponibles = JSON.parse(equiposGuardados);
    generarInterfazSeleccion();
  } else {
    fetch("equipos.json")
      .then((response) => response.json())
      .then((data) => {
        equiposDisponibles = data;
        localStorage.setItem(
          "equiposSimulador",
          JSON.stringify(equiposDisponibles)
        ); // Guarda los datos iniciales
        generarInterfazSeleccion(); // Genera la interfaz de selección
      })
      .catch((error) => {
        Swal.fire(
          "Error",
          "No se pudieron cargar los datos de los equipos.",
          "error"
        );
        console.error("Error al cargar los datos:", error);
      });
  }
});
