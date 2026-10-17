# AI Study Buddy — Studyspace

A calm, AI-powered study workspace for college students. Upload course PDFs, turn them into study notes, ask questions grounded in your material, practise with quizzes, and keep track of focused study time.

## Features

- Responsive dashboard, sidebar navigation, mobile menu, and light/dark themes.
- Secure PDF-only upload with a 20 MB limit, text extraction, document details, and deletion.
- AI summaries with short, detailed, simple-language, key-point, definition, formula, and exam-focused sections.
- Chat answers prioritizing the selected PDF; unsupported questions are identified instead of presented as material facts.
- Quiz generation from a selected PDF with 5, 10, or 20 multiple-choice questions, difficulty/topic settings, answer feedback, explanations, score, and weak-topic suggestions.
- SQLite persistence for the student profile, uploaded-document index and extracted text, quiz history, focused study time, and streak calculations.
- Progress dashboard, quiz history, topic accuracy, and a sample-data leaderboard.
- Browser-saved display preferences, daily goal, reminder preference, theme, and quiz difficulty.
- Helpful demo mode when no OpenAI key is configured. Summaries and quizzes use extracted PDF text; demo chat only matches material and clearly explains its limitations.

## Screenshots

_Screenshot placeholders — add product screenshots here._

## Tech stack

- Frontend: HTML5, CSS3, vanilla JavaScript
- Backend: Python 3.10+ and Flask
- PDF extraction: pypdf
- AI: OpenAI API, configured exclusively on the server
- Persistence: SQLite

## Folder structure

```text
AI-STUDY-BUDDY/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── backend/
│   ├── app.py
│   ├── ai.py
│   ├── pdf_reader.py
│   └── requirements.txt
├── data/
│   └── questions.json
├── uploads/
│   └── .gitkeep
├── .env                 # Local secrets/configuration; ignored by Git
├── .env.example
├── .gitignore
└── README.md
```

The SQLite database (`data/study_buddy.sqlite3`) is created automatically when the backend starts. Uploaded PDF files are stored in `uploads/`; both are local runtime data and excluded from Git.

## Installation

### Requirements

- Python 3.10 or newer
- pip
- An OpenAI API key for live AI responses (optional; demo mode works without it)

### Create and activate a virtual environment

Run these commands from the project root in PowerShell:

```powershell
py -3 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r backend\requirements.txt
```

If PowerShell blocks virtual-environment activation, allow it for the current terminal only:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
```

### Configure `.env`

The project includes a blank `.env` template. Open it and add your key:

```dotenv
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
HOST=127.0.0.1
PORT=5000
```

Obtain an API key from the OpenAI developer platform. Keep the key in the root `.env` only. The backend reads it with `python-dotenv`; it is never included in frontend files or API responses. Do not commit `.env`. If you do not configure a key, the app uses its clearly marked demo mode.

Required Python packages are Flask, openai, pypdf, and python-dotenv. Install them together using the `pip install -r` command above.

## Run the application

From the project root (with the virtual environment activated):

```powershell
python backend\app.py
```

Open **http://127.0.0.1:5000** in your browser. Flask serves the frontend and API from the same local origin. Stop the server with `Ctrl+C`.

## How the AI works

The browser sends a document ID and a question, summary preference, or quiz settings to the Flask API. The backend retrieves extracted text from SQLite and calls the OpenAI API using `OPENAI_API_KEY` from `.env`. Only the backend communicates with OpenAI. Prompts ask the model to treat PDF content as reference data, stay grounded in the material, and identify answers not supported by the notes. The app validates the shape of generated quiz questions and handles provider errors without pretending a request succeeded.

With no API key, the app does not make external AI calls. It creates a basic extractive summary, produces practice questions using statements from the chosen PDF, and matches chat questions to relevant passages. Demo responses are labelled and chat explicitly states when it cannot find an answer.

PDFs are validated by extension, PDF signature, parser, and size before the file is stored. Selectable text is extracted on the server. Scanned image-only PDFs need OCR processing before upload.

## Test the features

1. **Dashboard:** open the app and confirm the empty library, quiz, and study-time states are shown.
2. **PDF library:** drag in a text-based PDF or use **Add study material**. Confirm filename, size, page count, and upload feedback; try a non-PDF and a file over 20 MB to see validation.
3. **AI notes:** select a document, choose a note style, and create notes. With no key, check the demo-mode label; with a key, check the AI-generated sections.
4. **Ask your notes:** ask something covered in the document and then something unrelated. In demo mode, the response should show matching passages and identify unsupported questions.
5. **Quiz studio:** choose a document, question count, difficulty, and optional topic; answer every question and check correct/wrong feedback, explanations, score, weak topics, and the saved result.
6. **Progress:** finish a quiz and verify its score/history and topic performance. Start a focus session on the dashboard, let it run for at least one minute, then finish it to save study time.
7. **Leaderboard:** view the sample students and your position; completing quizzes changes the local XP calculation.
8. **Settings:** change the display name, goal, reminders, quiz difficulty, and theme. Reload the page to confirm browser preferences persist. Clear study history to reset quiz and study-time progress while retaining PDFs.
9. **Mobile layout:** resize the browser below 820 px and use the hamburger navigation.

## Future improvements

- Add accounts and multi-user authentication, then use real cohort leaderboards.
- Add OCR support for scanned documents and more file formats.
- Add flashcards, spaced repetition, course folders, and shareable study sets.
- Add configurable privacy controls, database migrations, backups, and deployment guidance.
- Add automated browser and API test suites.
