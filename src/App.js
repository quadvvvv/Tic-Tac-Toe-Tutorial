import { useState} from 'react';

function Square({isWinning, value, onSquareClick}){
  // note: button
  // button property or prop that tells CSS how to style the button
  // the className is "square", which corr. to .square in the styles.css file 

  // Bonus Point 4 - Additional logic for css-styling
  return <button 
      className={"square " + (isWinning ? "square--winning" : "")} // need space
      onClick={onSquareClick}
      >
        {value}
      </button>;
}

//TODO: Bonus Features

/**
 * 
 * @param {*} param0 
 * @returns 
 */
function Board({xIsNext, squares, onPlay}) {

  // note : useState()
  // value stores the value 
  // setValue is a function that can be used to change the value. 
  // The null passed to useState is used as the initial value for 
  // this state variable, so value here starts off equal to null.

  // note: removed for stage - 3
  // reason: now game takes care of the overall history
  // // array destructruing syntax 
  // // returns a stateful value and a function to update it
  // const [squares, setSquares] = useState(Array(9).fill(null));

  // // new state for feature-competitor
  // const [xIsNext, setXIsNext] = useState(true);


  function handleClick(i){
    if (calculateWinner(squares)[0] || squares[i]) {
      return;
    }
    // this line is crucial 
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    // note: important it's pass by function, so it's actually handlePlay(nextSquares) being called upon!!!
    
    // Bonus Point 5
    const r = Math.floor(i/3);
    const c = i%3;
    onPlay(nextSquares, [r,c]);
  }

  const [winner, winningSquares] = calculateWinner(squares);

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (!squares.includes(null)){
    status = "Nobody wins :(";
  }else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }


  // Bonus Point 2: Rewrite the board part with two loops
  const boardSize = 3;
  const boardToRender = []; // holds jsx elements, which are objects themselves

  for(let row = 0; row < boardSize; row++){
    const rowToRender = [];
    for(let col = 0; col<boardSize; col++){
      const i = row*boardSize+col; // Bonus Point 4: modified for winningSquares
      rowToRender.push( // you can push jsx element onto an array
        <Square
          isWinning={winner ? winningSquares.includes(i) : false}
          value={squares[i]}
          onSquareClick={()=>handleClick(i)}
        />
      );
    }
    boardToRender.push(<div className="board-row">{rowToRender}</div>);
  }

  return (<>
    <div className="status">{status}</div>
    {boardToRender}
  </>);

}

/**
 * you need the memory of the entire game, therefore, a new top-level component that's higher-level than a board
 * a game will have different iterations of boards (history)
 */
export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]); // array of array

  const [historyLoc, setHistoryLoc] = useState([[null, null]]); // Bonus Point 5

  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove%2===0;
  const currentSquares = history[currentMove];

  const [isDesc, setDesc] = useState(true); // Bonus Point 3: state to track sorting order

  function handlePlay(nextSquares, nextLocation){
    const nextHistory = [...history.slice(0,currentMove+1), nextSquares]; // [0, curentMove+1)
    const nextHistoryLoc = [...historyLoc.slice(0,currentMove+1), nextLocation];
    
    setHistory(nextHistory); // appending the updated squares array as a new entry
    setHistoryLoc(nextHistoryLoc); // Bonus Point 5
    setCurrentMove(nextHistory.length-1);
  }
  
  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  // Bonus Point 3: toggle sort
  function sortHistory(){
    setDesc(!isDesc);
  }

  // move is the index of the currentElement of the history array.
  const moves = history.map((squares, move) => { // redone with sorted history
    let description;
    if(move>0){
      const loc = historyLoc[move]; // Bonus Point 5
      const locText = loc ? `(${loc[0]}, ${loc[1]})` : "";// `` for format / interpolation

      description = "Go to move #" + move + " @location " + locText;
    }else{
      description = "Go to game start";
    }
    return ( // this is put into the ordered list part, therefore it makes perfect sense
      <li key={move}>
        { move===currentMove ? ( // Bonus Point 1
             <span>You are at {move === 0 ? "the start" : `move #${move} @ location (${historyLoc[move][0]}, ${historyLoc[move][1]})`}</span>
        ):(
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    )
  });
  

  return ( // modified for Bonus Point 3
    <div className="game">
      <div className ="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className = "game-info">
        <ol>{isDesc? moves:moves.reverse()}</ol>
        <button onClick={() => sortHistory()}>Sort by : {isDesc? "Descending" : "Ascending"}</button>
      </div>
    </div>
  )
}

/**
 * This is a hard coded function, merely test the coordinates.
 * @param {T} squares 
 * @returns 
 * */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], [a,b,c]];
    }
  }
  return [null, null];
}

