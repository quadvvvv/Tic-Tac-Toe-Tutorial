# React Tic-Tac-Toe Tutorial

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

Your average React 101.

## Features

1. Basic Tic-Tac-Toe gameplay
2. Move history and time travel
3. Dynamically rendered game board
4. Highlighted winning squares
5. Sort moves in ascending or descending order
6. Display game status (next player, winner, or draw)
7. Show move locations in the format (row, col)

## Project Structure

The game is composed of three main components:

1. `Square`: Represents individual squares on the game board
2. `Board`: Manages the game board and its state
3. `Game`: Handles the overall game logic, including history and time travel

## Setup and Running

1. Ensure you have Node.js and npm installed on your system.

2. Clone the repository:
   ```
   git clone [repository-url]
   cd react-tictactoe-tutorial
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000` to play the game.

## Bonus Features Implemented

1. Display the current move's location for each step in the format (row, col).
2. Bold the currently selected item in the move list.
3. Rewrite the Board to use two loops to make the squares instead of hardcoding them.
4. Add a toggle button that lets you sort the moves in either ascending or descending order.
5. When someone wins, highlight the three squares that caused the win.
6. When no one wins, display a message about the result being a draw.

## How to Play

1. Click on any empty square to make a move.
2. The game alternates between X and O players.
3. The first player to get three of their symbols in a row (horizontally, vertically, or diagonally) wins.
4. If all squares are filled and no player has won, the game is a draw.
5. Use the move history list to jump to any point in the game.
6. Toggle the sort order of moves using the "Sort by" button.
