export default function Square() {
  // button property or prop that tells CSS how to style the button
  // the className is "square", which corr. to .square in the styles.css file 

  return ( // parentheses used to group complex return statements to improve code readability
    <>
      <div className="board-row">
        <button className="square">1</button>
        <button className="square">1</button>
        <button className="square">1</button>
      </div>
      <div className="board-row">
        <button className="square">2</button>
        <button className="square">2</button>
        <button className="square">2</button>
      </div>
      <div className="board-row">
        <button className="square">3</button>
        <button className="square">3</button>
        <button className="square">3</button>
      </div>
    </> 
  );
}
