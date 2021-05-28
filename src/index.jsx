import React from "react";
import ReactDOM from "react-dom";

//Import statement to indicate that you need to bundle './index.scss'

import "./index.scss";

//Main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <div className="my-flix">
        <div>Good morning</div>
      </div>
    );
  }
}

//Finds the root if your app
const container = document.getElementsByClassName("app-container")[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
