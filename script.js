const palabras = ["perro", "carta", "flaco", "plaza", "noche", "casas", "banco", "verde"];
let palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
const maxIntentos = 6;
let intentos = 0;

const tablero = document.querySelector(".tablero");
const mensaje = document.querySelector(".mensaje");
const entrada = document.querySelector(".entrada");
const teclado = document.querySelector(".teclado");

// 🔹 Crear botón de reinicio
const botonReiniciar = document.createElement("button");
botonReiniciar.textContent = "Jugar otra vez";
botonReiniciar.classList.add("boton-reiniciar");
botonReiniciar.style.display = "none";
document.body.appendChild(botonReiniciar);

// 🔹 Funciones para crear tablero y teclado
function crearTablero() {
  tablero.innerHTML = "";
  for (let i = 0; i < maxIntentos * 5; i++) {
    const div = document.createElement("div");
    div.classList.add("letra");
    tablero.appendChild(div);
  }
}

function crearTeclado() {
  teclado.innerHTML = "";
  const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  for (let letra of letras) {
    const btn = document.createElement("button");
    btn.textContent = letra;
    btn.classList.add("tecla");
    teclado.appendChild(btn);
  }
}

// 🔹 Crear tablero y teclado al iniciar
crearTablero();
crearTeclado();

function actualizarTeclado(letra, estado) {
  const botones = document.querySelectorAll(".tecla");
  botones.forEach(boton => {
    if (boton.textContent === letra.toUpperCase()) {
      boton.classList.remove("correcta", "presente", "incorrecta");
      boton.classList.add(estado);
    }
  });
}

document.querySelector(".boton").addEventListener("click", () => {
  const intento = entrada.value.toLowerCase();

  if (intento.length !== 5) {
    mensaje.textContent = "La palabra debe tener 5 letras.";
    return;
  }

  if (!/^[a-zA-ZñÑ]+$/.test(intento)) {
    mensaje.textContent = "Solo se permite ingresar letras.";
    return;
  }

  mensaje.textContent = "";
  const letrasCeldas = document.querySelectorAll(".letra");
  let posicion = intentos * 5;

  for (let i = 0; i < 5; i++) {
    const celda = letrasCeldas[posicion + i];
    celda.textContent = intento[i];
    if (intento[i] === palabraSecreta[i]) {
      celda.classList.add("correcta");
      actualizarTeclado(intento[i], "correcta");
    } else if (palabraSecreta.includes(intento[i])) {
      celda.classList.add("presente");
      actualizarTeclado(intento[i], "presente");
    } else {
      celda.classList.add("incorrecta");
      actualizarTeclado(intento[i], "incorrecta");
    }
  }

  intentos++;

  if (intento === palabraSecreta) {
    mensaje.textContent = "¡Felicidades! Adivinaste la palabra.";
    entrada.disabled = true;
    mostrarBotonReiniciar();
    return;
  }

  if (intentos === maxIntentos) {
    mensaje.textContent = "Perdiste!. La palabra era: " + palabraSecreta.toUpperCase();
    entrada.disabled = true;
    mostrarBotonReiniciar();
  }

  entrada.value = "";
  entrada.focus();
});

function mostrarBotonReiniciar() {
  botonReiniciar.style.display = "block";
}

function reiniciarJuego() {
  palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
  intentos = 0;
  entrada.disabled = false;
  entrada.value = "";
  mensaje.textContent = "";
  crearTablero();
  crearTeclado();
  botonReiniciar.style.display = "none";
}

botonReiniciar.addEventListener("click", reiniciarJuego);