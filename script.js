const questions = [
  {
    q: "¿Qué papel debe ocupar Dios en el hogar cristiano?",
    options: ["Invitado ocasional", "Observador silencioso", "Centro y fundamento de la familia", "Consejero externo"],
    answer: 2
  },
  {
    q: "¿Qué práctica fortalece la presencia de Dios en el hogar?",
    options: ["Ver películas cristianas", "Reuniones familiares sin propósito espiritual", "Oración y lectura bíblica en familia", "Compartir memes cristianos"],
    answer: 2
  },
  {
    q: "¿Qué enseña la Biblia sobre criar a los hijos en el temor de Dios?",
    options: ["Que deben encontrar su propio camino", "Que deben ser disciplinados con dureza", "Que deben ser instruidos en el camino del Señor", "Que la iglesia se encargue de su formación"],
    answer: 2
  },
  {
    q: "¿Qué beneficio trae tener a Dios en el hogar?",
    options: ["Mayor prosperidad económica", "Paz, unidad y guía espiritual", "Menos discusiones", "Mayor influencia social"],
    answer: 1
  },
  {
    q: "Según Josué 24:15, ¿qué decisión expresa el líder del hogar?",
    options: ["Que todos son libres de elegir", "Que servirán al rey", "Que él y su casa servirán a Jehová", "Que buscarán otra religión"],
    answer: 2
  },
  {
    q: "¿Qué actitud debe mostrar una familia que tiene a Dios como centro?",
    options: ["Orgullo y superioridad", "Dependencia de Dios y amor mutuo", "Rigidez religiosa", "Aislamiento de los demás"],
    answer: 1
  },
  {
    q: "¿Cómo puede influir la adoración familiar en los hijos?",
    options: ["Los aburre y aleja", "Los hace más dependientes", "Desarrolla su fe y relación con Dios", "Los limita en lo social"],
    answer: 2
  },
  {
    q: "¿Qué rol cumple el amor en un hogar guiado por Dios?",
    options: ["Solo entre los padres", "Amor condicionado al comportamiento", "Amor como reflejo del amor de Cristo", "No es tan importante como la obediencia"],
    answer: 2
  },
  {
    q: "¿Qué versículo habla del hogar edificado por Dios?",
    options: ["Proverbios 31:10", "Salmo 127:1", "Juan 3:16", "Génesis 1:27"],
    answer: 1
  },
  {
    q: "¿Qué se espera de un hogar que honra a Dios?",
    options: ["Que no tenga problemas nunca", "Que sea ejemplo de fe, amor y obediencia", "Que siempre sea feliz", "Que evite a los no creyentes"],
    answer: 1
  }
];

const form = document.getElementById("quizForm");
const result = document.getElementById("result");
const submitBtn = document.getElementById("submitBtn");
const timerEl = document.getElementById("timer");

let answered = false;
let timer;
let timeLeft = 600; // 10 minutos

function renderQuestions() {
  if (sessionStorage.getItem("quizTaken")) {
    form.innerHTML = "<p>Ya has realizado este cuestionario.</p>";
    submitBtn.style.display = "none";
    return;
  }

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.classList.add("question");
    div.innerHTML = `<p><strong>${index + 1}. ${q.q}</strong></p>`;
    q.options.forEach((opt, i) => {
      div.innerHTML += `
        <label>
          <input type="radio" name="q${index}" value="${i}" required />
          ${opt}
        </label>
      `;
    });
    form.appendChild(div);
  });
}

function showResult() {
  let correct = 0;
  questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && parseInt(selected.value) === q.answer) {
      correct++;
    }
  });
  const incorrect = questions.length - correct;
  result.innerHTML = `✅ Aciertos: ${correct} | ❌ Errores: ${incorrect}`;
  sessionStorage.setItem("quizTaken", true);
  submitBtn.disabled = true;
}

function startTimer() {
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      showResult();
      timerEl.textContent = "⏰ Tiempo finalizado.";
    } else {
      const min = Math.floor(timeLeft / 60);
      const sec = timeLeft % 60;
      timerEl.textContent = `Tiempo restante: ${min}:${sec < 10 ? "0" : ""}${sec}`;
      timeLeft--;
    }
  }, 1000);
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!answered) {
    showResult();
    answered = true;
    clearInterval(timer);
  }
});

renderQuestions();
startTimer();
