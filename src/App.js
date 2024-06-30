import { useState} from 'react';

function Square({value, onSquareClick}){
  // note: button
  // button property or prop that tells CSS how to style the button
  // the className is "square", which corr. to .square in the styles.css file 
  return <button 
      className="square"
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
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // this line is crucial 
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    // note: important it's pass by function, so it's actually handlePlay(nextSquares) being called upon!!!
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }


  // Bonus Point 2: Rewrite the board part with two loops
  const boardSize = 3;
  const boardToRender = []; // holds jsx elements, which are objects themselves

  for(let row = 0; row < boardSize; row++){
    const rowToRender = [];
    for(let col = 0; col<boardSize; col++){
      const i = row*boardSize+col;
      rowToRender.push( // you can push jsx element onto an array
        <Square
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

  // return ( // parentheses used to group complex return statements to improve code readability
  //   //add the value prop to each Square component rendered by the Board component
  //   <>
  //     <div className="status">{status}</div>
  //     <div className="board-row">
  //       <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
  //       <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
  //       <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
  //     </div>
  //     <div className="board-row">
  //       <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
  //       <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
  //       <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
  //     </div>
  //     <div className="board-row">
  //       <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
  //       <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
  //       <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
  //     </div>
  //   </>
  // );
}

/**
 * you need the memory of the entire game, therefore, a new top-level component that's higher-level than a board
 * a game will have different iterations of boards (history)
 */
export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]); // array of array
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove%2===0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0,currentMove+1), nextSquares]; // [0, curentMove+1)
    setHistory(nextHistory); // appending the updated squares array as a new entry
    setCurrentMove(nextHistory.length-1);
  }
  
  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }


  // move is the index of the currentElement of the history array.
  const moves = history.map((squares, move) => {
    let description;
    if(move>0){
      description = "Go to move #" + move;
    }else{
      description = "Go to game start";
    }
    return ( // this is put into the ordered list part, therefore it makes perfect sense
      <li key={move}>
        { move===currentMove ? ( // updated for the bonus point 1 
          <span>You are at move #{move}</span>
        ):(
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    )
  });
  

  return (
    <div className="game">
      <div className ="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className = "game-info">
        <ol>{moves}</ol>
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
      return squares[a];
    }
  }
  return null;
}

