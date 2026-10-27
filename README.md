# Full-Stack Tic-Tac-Toe Enterprise Web Application

A full-stack, responsive Tic-Tac-Toe application built with modern web technologies, persistent game state tracking, automated computer opponent logic, and real-time scoreboard synchronization.

---

## 1. Project Overview
This project delivers a multi-mode Tic-Tac-Toe game supporting both interactive two-player matches and single-player matches against an automated computer player. The application enforces server-side authority: all game rules, move validations, win/draw evaluations, and scoreboard records are calculated and stored by the backend API.

---

## 2. Tech Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Bundler & Tooling:** Vite
- **Styling:** Tailwind CSS (custom dashboard theme)
- **Icons:** Lucide React
- **Architecture:** Custom React Hooks (`useTicTacToe`), clean service layer abstraction (`gameService.ts`), typed domain models.

### Backend
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database:** MongoDB Atlas via Mongoose ODM
- **Architecture:** Layered Controller-Service-Repository pattern, centralized error handling, and strict request/response DTO typing.

---

## 3. Features Implemented
- **Authoritative State Engine:** Game state, move sequences, and scores are managed on the backend.
- **Game Modes:**
  - **2 Player (Pass & Play):** Real-time turn switching between Player X and Player O.
  - **vs Computer:** Heuristic AI move selection (evaluating winning moves, blocking opponent wins, center/corner control).
- **Undo Functionality:**
  - In Two-Player mode, rewinds 1 move.
  - In Computer mode, rewinds 2 moves (undoes the AI response and the player's prior turn).
- **Visual Win Detection:** Real-time calculation and pulsing green highlight on winning lines (row, column, or diagonal).
- **Live Move Log:** Scrollable history recording player tokens and 1-based matrix coordinates `[row, col]`.
- **Persistent Scoreboard:** Tracks Player X wins, Player O wins, and Draws across sessions with persistent database storage and atomic reset.
- **Single-Screen Desktop Dashboard:** Responsive two-column interface fitting board, controls, logs, and scoreboards without window scrolling.

---

## 4. How to Run the Backend Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB daemon)

### Steps
1. Navigate to the backend directory:
   ```bash
   cd Backend