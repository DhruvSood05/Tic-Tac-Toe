# ✏️ Sketchy Tic-Tac-Toe (Multiplayer Edition)

A beautifully hand-drawn, real-time multiplayer Tic-Tac-Toe game built with **React 19**, **Tailwind CSS v4**, **Socket.io**, and **Node.js/Express**. 

Designed with a nostalgic, sketchy notebook-paper aesthetic, this app brings the classic pencil-and-paper game straight to the modern web browser with seamless real-time syncing.

---

## 🎨 Visual Philosophy & Design

The application is crafted to replicate the tactile experience of playing Tic-Tac-Toe in the back of a school notebook. Key design highlights include:
*   **Charming Fonts**: Built using Google Fonts — **Caveat** for player symbols ($X$ and $O$) and **Kalam** for hand-drawn UI labels.
*   **Sketchy Box Borders**: Customized borders with varying border-radii (`border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;`) that simulate hand-drawn squares.
*   **Notebook Layout**: High-quality gradient backgrounds that mirror traditional blue-lined notebook paper with a left-hand red margin.
*   **Noise Texture Overlay**: A subtle SVG fractal noise filter applied to the body to add an organic, paper-like texture.
*   **Playful Animations**: Engaging `sketchIn` keyframes with elastic transition curves (`cubic-bezier`) that make the $X$ and $O$ marks pop into existence.

---

## 🚀 Key Features

*   **Real-time Multiplayer Sync**: Instant state updates across players using WebSockets (Socket.io).
*   **Private & Random Game Rooms**: Create a new room with a random 6-character ID, copy the room link, and share it with friends to play.
*   **State-of-the-Art Turn & Winner System**: Automatically manages X vs O player assignment, turn validation, win pattern detection, and highlights winning lines.
*   **Robust Connection Resilience**: Automatically monitors player disconnections. If a user drops out, the room resets back to "waiting" state and clears the board for the remaining player.
*   **Rematch Engine**: Instant "Play Again" button for immediate rematches without having to recreate the room.
*   **Mobile-First Design**: Completely responsive grid structures designed to look gorgeous on smart phones, tablets, and desktops alike.

---

## 💻 Tech Stack

### Frontend (Client)
*   **React 19** - Utilizing modern component hooks and state synchronization.
*   **React Router DOM v7** - Seamless page transitions between the Lobby and game rooms.
*   **Tailwind CSS v4** - Fast and flexible custom design utility-first engine.
*   **Lucide React** - Clean and minimalist sketchy-friendly icons.
*   **Socket.io Client** - Bi-directional real-time connection to the game server.

### Backend (Server)
*   **Node.js & Express** - Lightweight server foundation and health routes.
*   **Socket.io Server** - Event-driven communication layer managing rooms and moves.

---

## 📁 Repository Structure

```text
├── server/
│   ├── index.js                  # Main server entry & socket.io setup
│   ├── sockets/
│   │   └── socketHandler.js      # Core socket connection & event handlers
│   └── utils/
│       └── gameLogic.js          # Room storage, move validator & win checker
├── src/
│   ├── assets/                   # Static assets
│   ├── components/
│   │   ├── Board.jsx             # Grid container rendering the 9 squares
│   │   └── Cell.jsx              # Render block for X/O with custom rotations
│   ├── hooks/
│   │   └── useGameState.js       # Hook connecting state with socket triggers
│   ├── pages/
│   │   ├── Lobby.jsx             # Welcome screen: Create/Join rooms
│   │   └── GameRoom.jsx          # Active gameplay interface
│   ├── socket/
│   │   └── socket.js             # Client-side socket initialization
│   ├── utils/
│   │   └── cn.js                 # Tailwind styling merger helper (clsx & twMerge)
│   ├── App.jsx                   # Application routing and overlays
│   ├── index.css                 # Base theme setup, fonts & paper texture styles
│   └── main.jsx                  # React application entry point
├── package.json                  # Integrated dependency manifest
├── vite.config.js                # Vite dev server configuration
└── tailwind.config.js            # Tailwind custom styling setup
```

---

## 🔧 Installation & Setup

To get a local development instance of **Sketchy Tic-Tac-Toe** running, follow these steps:

### Prerequisites
*   [Node.js](https://nodejs.org/) installed (v18+ recommended)
*   [npm](https://www.npmjs.com/) (installed automatically with Node)

### 1. Clone & Install Dependencies
Navigate into your project root folder and install the required dependencies (covers both Client and Server packages):
```bash
npm install
```

### 2. Configure Client Socket Endpoint
By default, the client is configured to connect to the backend socket server. Ensure that the socket connection file (`src/socket/socket.js`) points to your server URI:
```javascript
// Example in src/socket/socket.js
import { io } from "socket.io-client";
const SOCKET_URL = window.location.hostname === "localhost" ? "http://localhost:3000" : window.location.origin;
export const socket = io(SOCKET_URL, { autoConnect: false });
```

### 3. Running the Server (Backend)
Start the Express + Socket.io backend on port `3000`:
```bash
node server/index.js
```
*You should see:* `Server running on port 3000`

### 4. Running the Client (Frontend)
In a separate terminal window, launch the Vite development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to start playing! Open a second browser tab (or incognito window) with the same Room ID to test the multiplayer sync locally.

---

## 🎮 How to Play

1.  **Welcome to the Lobby**:
    *   Click **"Create New Room"** to generate a unique room code.
    *   Alternatively, type an existing code into the input field and click **"Join Room"**.
2.  **Invite an Opponent**:
    *   Copy the generated Room ID from the top header and send it to your friend.
    *   Once they enter the same Room ID in their browser, the game transitions from "Waiting for player..." to "Playing".
3.  **Draw Your Marks**:
    *   Players are dynamically assigned **X** (First Joiner) and **O** (Second Joiner).
    *   Simply click on an empty square during your turn. The system will sync the move instantly.
4.  **Win or Draw**:
    *   The engine automatically detects three-in-a-row (horizontal, vertical, or diagonal).
    *   When the game ends in a win or draw, a sketchy pop-up banner displays the outcome, allowing either player to initiate a rematch by clicking **"Play Again"**.
