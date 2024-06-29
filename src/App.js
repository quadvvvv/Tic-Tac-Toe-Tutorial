function Square({ value }){
  return <button className="square">{value}</button>;
}

export default function Board() {
  // button property or prop that tells CSS how to style the button
  // the className is "square", which corr. to .square in the styles.css file 

  return ( // parentheses used to group complex return statements to improve code readability
    //add the value prop to each Square component rendered by the Board component
    <>
      
      <div className="board-row">
        <Square value ="1"/> 
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </> 
  );
}
