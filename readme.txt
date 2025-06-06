# Imaginarium TCG Simulator

**Imaginarium** is a turn-based trading card game simulator inspired by literary and mythical characters. This project is a fully functional MVP of the game, including a deck builder, card browser, turn-based game board, and AI opponent.

## 🚀 Features

### ✅ Deck Builder
- Add/remove cards up to a 60-card limit
- Filter cards by gemstone, rarity, and type
- Limit of 3 copies per card
- Save/load deck to browser localStorage

### 🎴 Card Browser
- Browse the full collection of cards
- Card images, stats, attacks, and costs shown

### 🎮 Game Board
- Player vs. Dummy AI
- Turn-based flow: Draw → Main → Attack → End
- 1 Active and 4 Reserve character slots
- Dice-based attacks (`1D6`, `2D4`, etc.)
- Gemstone cost restrictions per attack
- LP tracking and character knockout on 0 LP

## 📦 Project Structure

imaginarium-tcg/
├── public/
│ └── assets/
│ ├── images/ # Card images (named 001.webp, 002.webp, etc.)
│ └── cards_updated.json # Card data
├── src/
│ ├── components/
│ │ ├── DeckBuilder.tsx # Deck builder interface
│ │ └── GameBoard.tsx # Core turn-based gameplay logic
│ └── main.tsx # App entry point
├── index.html
├── package.json
└── tailwind.config.js

Always show details


## 🛠️ Getting Started

Server launch

Server is a simple node.js application written in TypeScript. It uses express with websockets and typeorm for database access.

Prerequisites:

    Node.js 8 LTS or higher
    mysql-5 or sqlite-3

config.js contains all available options and its default values are defined in the src/config.ts

    Install all required dependencies.

npm install

    Add a file named ".env" in the main ptcg-server directory. Paste these contents.

STORAGE_TYPE='sqlite'
STORAGE_DATABASE='database.sq3'
SERVER_PASSWORD=''
SERVER_SECRET='!secret!'

    Build the project and start it.

npm run build
npm start

The service should now listen on the specified address and port. It will be http://localhost:8080 by default. This can be changed by editing config.js as previously mentioned. This server uses Sqlite-3.

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

```bash
npm install
npm run dev

Then open http://localhost:5173 in your browser.
🧪 Gameplay Overview

Each player:

    Draws from a deck of 60 cards

    Plays Characters to the field

    Attaches Gemstones to meet attack costs

    Rolls dice to determine damage output

    Knocks out enemy Characters by reducing LP to 0

AI:

    Draws cards each turn

    Plays Characters automatically

    Attacks if possible

📝 Future Improvements

    Multiplayer support

    Enhanced AI logic

    Real gemstone attachment logic (from hand)

    Status effects, ongoing powers, and multi-phase turns

    Animations for attacks and damage

📄 License

This project is open-source and free to use under the MIT License.