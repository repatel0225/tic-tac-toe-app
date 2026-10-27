---

#### 2. Frontend `README.md` (`C:\Users\GOG\Desktop\Tic-Tac-Toe\Frontend\README.md`)

Open `Frontend/README.md`, replace any default template text, paste this, and save:

```markdown
# Tic-Tac-Toe Frontend Client

Single-page web client built with React 18, TypeScript, Vite, and Tailwind CSS.

## Architecture
- `src/types/`: Strict TypeScript contracts and DTO interfaces mirroring backend models.
- `src/services/`: Isolated API layer using native `fetch` with centralized error handling.
- `src/hooks/`: Encapsulated state machine (`useTicTacToe`) managing async mutations, error flags, and score hydration.
- `src/components/`: Pure, presentation-focused UI components (`Board`, `Cell`, `Controls`, `Scoreboard`, `MoveHistory`).
- `src/index.css`: Tailwind utility-based dashboard layouts with responsive grid scaling.

## Setup & Running Locally
```bash
npm install
npm run dev