import React from "react";
import ReactDom from "react-dom";
import Login from "./pages/Login/index";

import "./assets/styles/app.less";

function App() {
  return (
    <div>
      <Login></Login>
    </div>
  );
}

ReactDom.render(<App></App>, document.getElementById("root"));
