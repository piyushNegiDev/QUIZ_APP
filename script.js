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
    console.log(data);
    uiRender(data, questionIndex);
  } catch (e) {
    console.log(e);
  }
}

function uiRender(data, i) {
  document.body.innerHTML = `
  <div class="container" id="container">
      <div class="header">
        <div class="headerFirst">
          <p class="challengeMode">Challenge Mode</p>
          <p class="technicalQuiz">Technical Quiz</p>
        </div>
        <div class="headerSecond">
          <p>Questions</p>
          <p>${i + 1}/${data.length}</p>
        </div>
      </div>

      <div class="stats">
        <div class="progressPercentage">
          <p>Progress</p>
          <p>${i * 10}%</p>
        </div>
        
        <div class="progressBarBorder">
          <div class="progressBar"></div>
        </div>

        <div class="stat">
          <div class="score">
            <p>SCORE</p>
            <p id="score">${score}</p>
          </div>
          <div class="timeLeft">
            <p>TIME LEFT</p>
            <p>0s</p>
          </div>
        </div>
      </div>

      <div class="questionContainer">
        <p>QUESTION ${i + 1}</p>

        <p>${data[i].question}</p>

        <button
          class="btnOption"
          id="aBtn"
          data-correct="${data[i].correct_answers.answer_a_correct}"
        >
          A. ${data[i].answers.answer_a}
        </button>
        <button
          class="btnOption"
          id="bBtn"
          data-correct="${data[i].correct_answers.answer_b_correct}"
        >
          B. ${data[i].answers.answer_b}
        </button>
        <button
          class="btnOption"
          id="cBtn"
          data-correct="${data[i].correct_answers.answer_c_correct}"
        >
          C. ${data[i].answers.answer_c}
        </button>
        <button
          class="btnOption"
          id="dBtn"
          data-correct="${data[i].correct_answers.answer_d_correct}"
        >
          D. ${data[i].answers.answer_d}
        </button>
        <p>No answer selected for this question.</p>
      </div>

      <div class="btnDiv">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  `;

  containerEvent(data);
}

function containerEvent(data) {
  let container = document.querySelector("#container");
  container.addEventListener("click", (e) => {
    console.log(e.target.dataset.correct);

    if (e.target.tagName === "BUTTON") {
      console.log(e.target);

      if (e.target.dataset.correct === "true") {
        console.log("PHele", questionIndex);
        if (questionIndex < data.length - 1) {
          score++;
          uiRender(data, ++questionIndex);
          document.querySelector(".progressBar").style.width =
            questionIndex * 10 + "%";
        } else {
          document.querySelector(".progressBar").style.width = 100 + "%";
          alert("Quiz Finished!");
        }
      } else {
        e.target.style.borderColor = "red";
        const btns = document.querySelectorAll(".btnOption");
        btns.forEach((btn) => {
          if (btn.dataset.correct === "true") {
            btn.style.borderColor = "green";
            setTimeout(() => {
              uiRender(data, ++questionIndex);
            }, 2000);
          }
        });
      }
    }
  });
}

let tempData = [
  {
    id: 1825,
    question: "What happens when an object's reference count drops to zero?",
    description:
      "Understanding the effect of reference count on an object's lifecycle is important for memory management.",
    answers: {
      answer_a: "The object is moved to a cache",
      answer_b: "The object is deleted and memory is reclaimed",
      answer_c: "The object is copied",
      answer_d: "The object becomes a global variable",
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
      "When an object's reference count drops to zero, it means that no references to the object exist, and the memory allocated to it can be reclaimed by the garbage collector.",
    tip: null,
    tags: [
      {
        name: "Python",
      },
    ],
    category: "Code",
    difficulty: "Easy",
  },
  {
    id: 1271,
    question: "What is the primary role of etcd in an OpenShift cluster?",
    description:
      "etcd is a distributed key-value store that stores the cluster's state data.",
    answers: {
      answer_a: "To manage pod scheduling",
      answer_b: "To store and maintain cluster configuration and state data",
      answer_c: "To handle network policies",
      answer_d: "To control access to the API server",
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
      "etcd stores the entire state of the OpenShift cluster, including configurations and runtime data.",
    tip: null,
    tags: [
      {
        name: "Openshift",
      },
    ],
    category: "DevOps",
    difficulty: "Hard",
  },
  {
    id: 2788,
    question: "How do you add a custom view to the Django Admin site?",
    description:
      "Adding custom views allows you to extend the functionality of Django Admin with additional pages or tools.",
    answers: {
      answer_a: "Use the admin.site.register_view() method",
      answer_b: "Set custom_view=True in ModelAdmin",
      answer_c: "Override the get_view() method",
      answer_d: "Use the @admin_view decorator",
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: "false",
    correct_answers: {
      answer_a_correct: "true",
      answer_b_correct: "false",
      answer_c_correct: "false",
      answer_d_correct: "false",
      answer_e_correct: "false",
      answer_f_correct: "false",
    },
    correct_answer: null,
    explanation:
      "To add a custom view to Django Admin, use the admin.site.register_view() method, which allows you to register a new view that can be accessed from the Admin interface.",
    tip: null,
    tags: [
      {
        name: "Django",
      },
    ],
    category: "Django",
    difficulty: "Medium",
  },
  {
    id: 10014,
    question:
      "A JavaScript application needs to implement form generation based on dynamic schemas. Which approach would be most maintainable?",
    description:
      "Implementing dynamic form generation in JavaScript applications.",
    answers: {
      answer_a: "Hardcode each possible form layout",
      answer_b: "Implement a declarative form renderer with component registry",
      answer_c: "Generate forms using string templates",
      answer_d: "Use only basic HTML form elements",
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
      "A declarative form renderer with component registry provides the most maintainable dynamic form solution. This approach creates forms from schema objects describing fields and validation. The component registry maps schema types to appropriate UI components. This pattern enables handling complex form scenarios like conditional fields and dependencies, supports custom field types and layouts, separates form structure from rendering logic, and creates a maintainable system that can adapt to changing form requirements without code modifications.",
    tip: null,
    tags: [
      {
        name: "JavaScript",
      },
    ],
    category: "Code",
    difficulty: "Hard",
  },
  {
    id: 10498,
    question:
      "You are deploying a containerized application that requires persistent storage for data. Which Kubernetes feature can you use to manage storage volumes that exist beyond the lifecycle of individual containers?",
    description:
      "Addressing persistent storage requirements in a Kubernetes environment for containerized applications.",
    answers: {
      answer_a: "Pods",
      answer_b: "Deployments",
      answer_c: "PersistentVolumes",
      answer_d: "Services",
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: "false",
    correct_answers: {
      answer_a_correct: "false",
      answer_b_correct: "false",
      answer_c_correct: "true",
      answer_d_correct: "false",
      answer_e_correct: "false",
      answer_f_correct: "false",
    },
    correct_answer: null,
    explanation:
      "PersistentVolumes in Kubernetes provide a way to store data in a durable and independent manner, allowing storage to outlive the lifecycle of a pod.",
    tip: "By using PersistentVolumes, you can decouple storage management from pod lifecycle, enabling data persistence across container restarts.",
    tags: [
      {
        name: "Undefined",
      },
    ],
    category: "uncategorized",
    difficulty: "Easy",
  },
  {
    id: 5909,
    question:
      "How do you optimize performance by avoiding unnecessary reactivity in the Composition API?",
    description:
      "Understanding ways to limit reactivity for better performance.",
    answers: {
      answer_a:
        "Use 'markRaw()' for non-reactive data and avoid wrapping everything in 'reactive()' or 'ref()'",
      answer_b: "Make every value reactive",
      answer_c: "Use 'deep: true' for all properties",
      answer_d: "Use 'watchEffect()' everywhere",
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: "false",
    correct_answers: {
      answer_a_correct: "true",
      answer_b_correct: "false",
      answer_c_correct: "false",
      answer_d_correct: "false",
      answer_e_correct: "false",
      answer_f_correct: "false",
    },
    correct_answer: null,
    explanation:
      "For performance optimization, use 'markRaw()' for non-reactive data and only make essential data reactive.",
    tip: null,
    tags: [
      {
        name: "VueJS",
      },
    ],
    category: "VueJS",
    difficulty: "Medium",
  },
  {
    id: 7122,
    question: "How do you check if a variable contains only digits in Bash?",
    description: "Understanding numeric validation in Bash.",
    answers: {
      answer_a: "[[ $var =~ ^[0-9]+$ ]]",
      answer_b: "[[ $var -eq $var ]]",
      answer_c: "grep -E '^[0-9]+$' <<< \"$var\"",
      answer_d: "All of the above",
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: "false",
    correct_answers: {
      answer_a_correct: "false",
      answer_b_correct: "false",
      answer_c_correct: "false",
      answer_d_correct: "true",
      answer_e_correct: "false",
      answer_f_correct: "false",
    },
    correct_answer: null,
    explanation:
      "All the given options correctly check if a variable contains only digits.",
    tip: null,
    tags: [
      {
        name: "BASH",
      },
    ],
    category: "bash",
    difficulty: "Hard",
  },
  {
    id: 4355,
    question:
      "What's the recommended way to handle file uploads with progress?",
    description: "Understanding file upload management.",
    answers: {
      answer_a: "Basic form upload",
      answer_b: "Chunked upload with progress tracking",
      answer_c: "Direct upload",
      answer_d: "No progress",
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
      "Using chunked upload with progress tracking provides reliable file uploads while maintaining good user feedback and handling large files efficiently.",
    tip: null,
    tags: [
      {
        name: "Next.js",
      },
    ],
    category: "Next.js",
    difficulty: "Medium",
  },
  {
    id: 9885,
    question:
      "Your React project requires a complex dashboard with real-time data. Which data fetching strategy would perform best?",
    description:
      "Implementing efficient data fetching for real-time dashboards in React.",
    answers: {
      answer_a: "Fetch all data on load with a single API call",
      answer_b:
        "Implement a data fetching layer with WebSockets and selective updates",
      answer_c: "Poll the API every second for all dashboard data",
      answer_d: "Load data only when users click a refresh button",
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
      "A data fetching layer with WebSockets and selective updates provides the best performance for real-time dashboards. WebSockets maintain a persistent connection for immediate updates without polling overhead. Selective updates transmit only changed data, reducing bandwidth usage. The data fetching layer abstracts these complexities from components, providing them with current data through hooks or context. This approach delivers real-time updates efficiently while maintaining separation of concerns and keeping components focused on rendering.",
    tip: null,
    tags: [
      {
        name: "React",
      },
    ],
    category: "React",
    difficulty: "Hard",
  },
  {
    id: 3399,
    question:
      "How do you disable Network Manager for a specific interface in Ubuntu?",
    description:
      "Disabling Network Manager for an interface helps in manually configuring that network interface.",
    answers: {
      answer_a: "Use 'nmcli dev set INTERFACE_NAME managed no'",
      answer_b: "Run 'disable-netmgr INTERFACE_NAME'",
      answer_c: "Type 'nm-set unmanaged INTERFACE_NAME'",
      answer_d: "Use 'netmgr off INTERFACE_NAME'",
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: "false",
    correct_answers: {
      answer_a_correct: "true",
      answer_b_correct: "false",
      answer_c_correct: "false",
      answer_d_correct: "false",
      answer_e_correct: "false",
      answer_f_correct: "false",
    },
    correct_answer: null,
    explanation:
      "To disable Network Manager for a specific interface, use 'nmcli dev set INTERFACE_NAME managed no'.",
    tip: null,
    tags: [
      {
        name: "Ubuntu",
      },
    ],
    category: "bash",
    difficulty: "Medium",
  },
];

uiRender(tempData, 0);
console.log(tempData.length);
