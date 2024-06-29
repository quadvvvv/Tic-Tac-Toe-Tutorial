// Part 1 
// StrictMode is used to highlight potential problems in your React application during development. 
// It does not render any visible UI itself but activates additional checks and warnings for its descendants.

// Note: 
/**
 * React in this context refers to the default export from the 'react' module, which includes essential utilities and 
 * methods for creating and managing components in React applications. By importing React, you ensure that JSX syntax 
 * is properly transpiled and that React-specific features, like hooks (useState, useEffect, etc.), context API 
 * (React.createContext), and more, are available within your component definitions.
 */

import React, { StrictMode } from "react";

// creating a root React component that can be rendered into a web browser.
import { createRoot } from "react-dom/client";

// styling rules (such as classes, ids, etc.) for your React components defined in the application.
import "./styles.css";


// This line imports the default export (App) from the App.js file. Assuming App.js contains a React component (possibly named App), 
// this import statement brings in that component so that it can be rendered within your application.
import App from "./App";

// Part 2 

// creates a root instance for rendering a React application into the specified DOM element 
const root = createRoot(document.getElementById("root")); 

/*
* <StrictMode> is a React component used to highlight potential problems in your application's code during development. 
* <App /> is your main application component, which is rendered wrapped in <StrictMode>.
*/
root.render( // this is the JSX argument taken by root.render
  <StrictMode>
    <App />
  </StrictMode>
);