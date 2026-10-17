// ===============================
// AI STUDY BUDDY - MAIN JAVASCRIPT
// ===============================


// ---------- PAGE NAVIGATION ----------

const navItems = document.querySelectorAll(".nav-item[data-section]");
const sections = document.querySelectorAll(".section");
const pageTitle = document.getElementById("pageTitle");

const titles = {
    dashboard: "Dashboard",
    pdf: "Upload Study Material",
    summary: "AI Summary",
    ask: "Ask AI",
    quiz: "Quiz Challenge",
    progress: "My Progress",
    leaderboard: "Leaderboard",
    settings: "Settings"
};

function openSection(sectionName) {

    sections.forEach(section => {
        section.classList.remove("active-section");
    });

    const target = document.getElementById(sectionName);

    if (target) {
        target.classList.add("active-section");
    }

    navItems.forEach(item => {
        item.classList.remove("active");

        if (item.dataset.section === sectionName) {
            item.classList.add("active");
        }
    });

    pageTitle.textContent = titles[sectionName] || "Dashboard";

    document.querySelector(".sidebar").classList.remove("open");
}


// Sidebar navigation
navItems.forEach(item => {

    item.addEventListener("click", () => {
        openSection(item.dataset.section);
    });

});


// Buttons that contain data-section
document.querySelectorAll("[data-section]").forEach(button => {

    button.addEventListener("click", () => {

        if (button.classList.contains("nav-item")) return;

        openSection(button.dataset.section);

    });

});


// ---------- MOBILE MENU ----------

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});


// ---------- DARK MODE ----------

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const text = themeBtn.querySelector("span");

    if (document.body.classList.contains("dark")) {
        themeBtn.querySelector("span").textContent = "Light Mode";
        themeBtn.firstChild.textContent = "☀️ ";
    } else {
        themeBtn.querySelector("span").textContent = "Dark Mode";
        themeBtn.firstChild.textContent = "🌙 ";
    }

});


// ---------- PDF UPLOAD ----------

const pdfInput = document.getElementById("pdfInput");
const fileName = document.getElementById("fileName");

pdfInput.addEventListener("change", () => {

    const file = pdfInput.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
        fileName.textContent = "❌ Please select a PDF file.";
        return;
    }

    if (file.size > 20 * 1024 * 1024) {
        fileName.textContent = "❌ File is larger than 20 MB.";
        return;
    }

    fileName.textContent = `✅ ${file.name} uploaded successfully!`;

});


// ---------- AI SUMMARY DEMO ----------

const summaryBtn = document.getElementById("summaryBtn");
const summaryOutput = document.getElementById("summaryOutput");

summaryBtn.addEventListener("click", () => {

    summaryBtn.textContent = "⏳ Generating...";

    setTimeout(() => {

        summaryOutput.innerHTML = `
            <h3>📚 Stack & Queue - Quick Summary</h3>

            <br>

            <p>
                <strong>Stack:</strong> A stack is a linear data structure
                that follows the <strong>LIFO</strong> principle
                (Last In, First Out).
            </p>

            <br>

            <p>
                <strong>Queue:</strong> A queue follows the
                <strong>FIFO</strong> principle
                (First In, First Out).
            </p>

            <br>

            <p>
                <strong>Important operations:</strong>
                Push, Pop and Peek are commonly used with stacks,
                while Enqueue and Dequeue are used with queues.
            </p>

            <br>

            <p>💡 This is currently demo content.
            Later we will connect the real AI + PDF backend.</p>
        `;

        summaryBtn.textContent = "✨ Generate Summary";

    }, 1000);

});


// ---------- ASK AI DEMO ----------

const askBtn = document.getElementById("askBtn");
const questionInput = document.getElementById("questionInput");
const chatMessages = document.getElementById("chatMessages");

function askQuestion() {

    const question = questionInput.value.trim();

    if (!question) return;


    // User message
    const userMessage = document.createElement("div");

    userMessage.className = "message user";

    userMessage.innerHTML = `
        <div class="message-avatar">👤</div>

        <div>
            <strong>You</strong>
            <p>${question}</p>
        </div>
    `;

    chatMessages.appendChild(userMessage);

    questionInput.value = "";

    chatMessages.scrollTop = chatMessages.scrollHeight;


    // AI response
    setTimeout(() => {

        const aiMessage = document.createElement("div");

        aiMessage.className = "message ai";

        aiMessage.innerHTML = `
            <div class="message-avatar">🤖</div>

            <div>
                <strong>StudyBuddy AI</strong>

                <p>
                    Great question! Once the AI backend is connected,
                    I will answer this using your uploaded study material.
                </p>
            </div>
        `;

        chatMessages.appendChild(aiMessage);

        chatMessages.scrollTop = chatMessages.scrollHeight;

    }, 700);

}

askBtn.addEventListener("click", askQuestion);

questionInput.addEventListener("keypress", (event) => {

    if (event.key === "Enter") {
        askQuestion();
    }

});


// ---------- QUIZ ----------

const quizQuestions = [

    {
        question: "Which data structure follows LIFO?",
        options: ["Stack", "Queue", "Array", "Linked List"],
        answer: "Stack"
    },

    {
        question: "Which data structure follows FIFO?",
        options: ["Stack", "Queue", "Tree", "Graph"],
        answer: "Queue"
    },

    {
        question: "Which language is commonly used for Data Science?",
        options: ["Python", "HTML", "CSS", "XML"],
        answer: "Python"
    },

    {
        question: "What does CPU stand for?",
        options: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Control Processing User"
        ],
        answer: "Central Processing Unit"
    },

    {
        question: "Which one is an OOP concept?",
        options: [
            "Encapsulation",
            "Compilation",
            "Browsing",
            "Rendering"
        ],
        answer: "Encapsulation"
    }

];


let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const questionNumber = document.getElementById("questionNumber");
const quizScore = document.getElementById("quizScore");
const nextBtn = document.getElementById("nextBtn");


function loadQuestion() {

    const q = quizQuestions[currentQuestion];

    questionElement.textContent = q.question;

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${quizQuestions.length}`;

    quizScore.textContent = `Score: ${score}`;

    optionsElement.innerHTML = "";

    answered = false;

    q.options.forEach(option => {

        const button = document.createElement("button");

        button.textContent = option;

        button.addEventListener("click", () => {

            if (answered) return;

            answered = true;

            if (option === q.answer) {

                button.classList.add("correct");

                score++;

            } else {

                button.classList.add("wrong");

                [...optionsElement.children].forEach(btn => {

                    if (btn.textContent === q.answer) {
                        btn.classList.add("correct");
                    }

                });

            }

            quizScore.textContent = `Score: ${score}`;

        });

        optionsElement.appendChild(button);

    });

}


nextBtn.addEventListener("click", () => {

    if (currentQuestion < quizQuestions.length - 1) {

        currentQuestion++;

        loadQuestion();

    } else {

        questionElement.textContent =
            `🎉 Quiz Complete! Your score is ${score}/${quizQuestions.length}`;

        optionsElement.innerHTML = `
            <p style="text-align:center;">
                Great job! Keep learning and improve your score 🚀
            </p>
        `;

        nextBtn.textContent = "Restart Quiz";

        nextBtn.onclick = () => {

            currentQuestion = 0;
            score = 0;
            nextBtn.textContent = "Next Question →";

            loadQuestion();

        };

    }

});


loadQuestion();


// ---------- DRAG & DROP PDF ----------

const dropZone = document.getElementById("dropZone");

dropZone.addEventListener("dragover", (event) => {

    event.preventDefault();

    dropZone.style.borderColor = "#6c5ce7";

});

dropZone.addEventListener("dragleave", () => {

    dropZone.style.borderColor = "#cfd2dc";

});

dropZone.addEventListener("drop", (event) => {

    event.preventDefault();

    dropZone.style.borderColor = "#cfd2dc";

    const files = event.dataTransfer.files;

    if (files.length > 0) {

        const file = files[0];

        if (file.type === "application/pdf") {

            fileName.textContent =
                `✅ ${file.name} uploaded successfully!`;

        } else {

            fileName.textContent =
                "❌ Please drop a PDF file.";

        }

    }

});


// ---------- CONSOLE ----------

console.log("🚀 AI Study Buddy frontend loaded successfully!");