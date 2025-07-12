const questions = [
  {
    q: "¿Qué significa anhelar la presencia de Dios según los Salmos?",
    options: ["Tener miedo de Dios", "Buscar bendiciones materiales", "Desear comunión profunda con Él", "Huir del mundo"],
    answer: 2
  },
  {
    q: "¿Qué actitud muestra alguien que anhela la presencia de Dios?",
    options: ["Desinterés espiritual", "Religiosidad vacía", "Pasión y entrega en la oración", "Rutina dominical"],
    answer: 2
  },
  {
    q: "¿Qué ejemplo bíblico refleja un corazón sediento de la presencia de Dios?",
    options: ["Jonás huyendo de Nínive", "David en el desierto clamando a Dios", "Sansón pidiendo fuerza", "Pedro pescando"],
    answer: 1
  },
  {
    q: "¿Qué se necesita para experimentar la presencia de Dios?",
    options: ["Mucho dinero", "Un templo lujoso", "Corazón contrito y humillado", "Sacrificios físicos"],
    answer: 2
  },
  {
    q: "¿Qué nos enseña Éxodo 33:15 sobre la presencia de Dios?",
    options: ["Que Moisés pidió no continuar sin ella", "Que solo los profetas la tenían", "Que no es tan importante", "Que se sustituye con reglas"],
    answer: 0
  },
  {
    q: "¿Cuál es una señal de que alguien anhela a Dios verdaderamente?",
    options: ["Busca títulos espirituales", "Desea intimidad con Él diariamente", "Comparte solo versículos en redes", "Discute sobre religión"],
    answer: 1
  },
  {
    q: "¿Qué produce la presencia de Dios en la vida del creyente?",
    options: ["Confusión religiosa", "Fanatismo", "Paz, gozo y dirección", "Éxito automático"],
    answer: 2
  },
  {
    q: "¿Cómo respondió Isaías al encontrarse con la presencia de Dios?",
    options: ["Se exaltó a sí mismo", "Pidió más bendiciones", "Reconoció su pecado", "Se fue corriendo"],
    answer: 2
  },
  {
    q: "¿Qué ocurre cuando una iglesia busca genuinamente la presencia de Dios?",
    options: ["Se divide", "Crece solo numéricamente", "Se transforma espiritualmente", "Pierde miembros"],
    answer: 2
  },
  {
    q: "¿Qué representa el Tabernáculo en el Antiguo Testamento?",
    options: ["Una tienda común", "Un símbolo de riqueza", "Lugar de encuentro con la presencia de Dios", "Un lugar cerrado solo para reyes"],
    answer: 2
  },
  {
    q: "¿Qué actitud mostró María de Betania ante la presencia de Jesús?",
    options: ["Se ocupó en los quehaceres", "Le ignoró", "Se sentó a sus pies para oírlo", "Le reclamó"],
    answer: 2
  },
  {
    q: "¿Cómo responde Dios a quienes lo buscan con sinceridad?",
    options: ["Los ignora", "Les pone obstáculos", "Se deja encontrar", "Les da castigos"],
    answer: 2
  },
  {
    q: "¿Qué relación hay entre santidad y la presencia de Dios?",
    options: ["Ninguna", "La santidad es una condición para habitar en Su presencia", "Solo los pastores deben ser santos", "Dios ignora el pecado"],
    answer: 1
  },
  {
    q: "¿Qué hizo el salmista cuando sintió que Dios estaba lejos?",
    options: ["Se resignó", "Se rebeló", "Clamó con intensidad por Él", "Buscó distracción"],
    answer: 2
  },
  {
    q: "¿Qué caracteriza a un corazón que anhela a Dios más que todo?",
    options: ["Compite por ser líder", "Quiere ser visto", "Prioriza a Dios sobre todo lo demás", "Solo busca experiencias"],
    answer: 2
  },
  {
    q: "¿Cuál es el efecto de la adoración verdadera en la presencia de Dios?",
    options: ["Cambio emocional temporal", "Transformación del corazón", "Solo un canto bonito", "Religiosidad externa"],
    answer: 1
  },
  {
    q: "¿Qué dijo Jesús sobre buscar primero el Reino de Dios?",
    options: ["Es opcional", "Será recompensado con riquezas", "Lo demás será añadido", "Es para los religiosos"],
    answer: 2
  },
  {
    q: "¿Qué se requiere para entrar confiadamente al lugar santísimo, según Hebreos?",
    options: ["Tener títulos", "Ser miembro antiguo", "La sangre de Cristo", "Ser judío"],
    answer: 2
  },
  {
    q: "¿Qué representa el anhelo por Dios en tiempos de sequía espiritual?",
    options: ["Debilidad", "Fe viva y dependencia", "Poca madurez", "Pecado oculto"],
    answer: 1
  },
  {
    q: "¿Cuál debe ser la oración de quien anhela la presencia de Dios?",
    options: ["Dame más cosas", "Usa a otro", "No quites de mí tu Santo Espíritu", "Hazme famoso"],
    answer: 2
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
      timerEl.textContent = `⏳ Tiempo restante: ${min}:${sec < 10 ? "0" : ""}${sec}`;
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
