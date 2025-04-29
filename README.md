A simple and intuitive note-taking application built with **React + TypeScript + Vite**, using `localStorage` for data persistence. This was developed as part of a 2-hour frontend assignment challenge.

🔗 **Live Demo:** [https://notes-app-beta-pied.vercel.app](https://notes-app-beta-pied.vercel.app)  
📁 **Repo:** [https://github.com/benazeem/Notes-App](https://github.com/benazeem/Notes-App)

---

## 🚀 Setup & Run

```bash
# Clone the repo
git clone https://github.com/benazeem/Notes-App.git
cd Notes-App

# Install dependencies
npm install

# Start the development server
npm run dev

## 🛠️ Features
- Add notes with a title and content.
- View a list of saved notes.
- Notes are saved in the browser’s localStorage.
- Error and loading states handled gracefully.
- Minimal navigation between "Add Note" and "View Notes".


## 💡 Design Decisions – "Why?" Documentation
### 📦 Storage Strategy
Why localStorage: Client-side persistence without backend; perfect for small note data.

Key Naming: Used a simple key like user_notes to keep data retrieval straightforward and scoped to this app.

### 🧱 Component Design
AddNote.tsx: Handles controlled inputs and submits using useState.
// Why I chose useState + this submit handler: Easy form state control and local update on submit.

NotesList.tsx: Loads saved notes from localStorage during component mount using useEffect.
// Why useEffect to sync storage → state: Ensures latest notes load on view.

Navigation: Simple button-based nav to toggle between "Add Note" and "View Notes".
// Why this nav approach for simplicity: Lightweight state-based tab switch avoids routing overhead.


### 🎨 Styling
Tailwind CSS:
// Why Tailwind: Rapid utility styling, avoids CSS bloat, and allows fast prototyping.

### ⚠️ Loading & Error Handling
Error message is shown if localStorage read/write fails.
// Why display error banner: Helps users understand issues like quota errors.

“Saving...” loading state shown when persisting a new note.
// Why show spinner here: Indicates write operation in progress, improving UX feedback.