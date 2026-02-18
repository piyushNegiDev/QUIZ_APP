const api_key = "Nzuv8rw1i1FwkvaNjVuCuGr1XjXiu5io5SvXlU5v";

// const api_url =
//   "https://quizapi.io/api/v1/questions?apiKey=YOUR_API_KEY&limit=10";

// https://quizapi.io/api/v1/questions?apiKey=YOUR_API_KEY&category=next-js&limit=10

const questions = document.getElementById("questionsRange");
let questionIndex = 0;
let score = 0;

questions.addEventListener("input", () => {
  document.querySelector(".number-of-questions").innerHTML = questions.value;
});

document.getElementById("renderQuizBtn").addEventListener("click", () => {
  const category = document.getElementById("category").value;
  const diffculty = document.getElementById("difficulty").value;

  console.log(diffculty);
  console.log(category);
  console.log(questions.value);

  getData(category, diffculty, questions.value);
});

async function getData(category, difficulty, limit) {
  try {
    const response = await fetch(
      `https://quizapi.io/api/v1/questions?apiKey=${api_key}&difficulty=${difficulty}&limit=${limit}&category=${category}`,
    );
    const data = await response.json();
    console.log(data[0]);
    uiRender(data, questionIndex);
  } catch (e) {
    console.log(e);
  }
}

function uiRender(data, i) {
  document.body.innerHTML = `
  
  `;

  containerEvent(data);
}

function containerEvent(data) {
  let container = document.querySelector("#container");
  container.addEventListener("click", (e) => {
    console.log(e.target.dataset.correct);

    if (e.target.tagName === "BUTTON") {
      if (e.target.dataset.correct === "true") {
        console.log("inside");

        if (questionIndex < data.length - 1) {
          score++;
          document.getElementById("score").innerHTML = `${score}`;

          uiRender(data, ++questionIndex);
        } else {
          alert("Quiz Finished!");
        }
      }
    }
  });
}

let tempData = [
  {
    id: 8986,
    question:
      "What happens if a user disables cookies in their browser and the application relies on session cookies?",
    description: "Understanding session behavior when cookies are disabled.",
    answers: {
      answer_a: "Sessions will continue to work normally",
      answer_b: "The session will not persist across pages",
      answer_c: "PHP will automatically store the session ID in the URL",
      answer_d: "The user will be redirected to an error page",
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: "false",
    correct_answers: {
      answer_a_correct: "false",
      answer_b_correct: "true",
      answer_c_correct: "false",
      answer_d_correct: "false",
      answer_e_correct: "false",
      answer_f_correct: "false",
    },
    correct_answer: null,
    explanation:
      "If cookies are disabled, session data cannot persist across pages unless PHP is configured to pass session IDs in URLs.",
    tip: null,
    tags: [
      {
        name: "PHP",
      },
    ],
    category: "Code",
    difficulty: "Medium",
  },
];
// console.log(tempData[0].answers.answer_a);
// console.log(tempData[0].correct_answers.answer_a_correct);
