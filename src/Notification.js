import React from "react";
import App from "./App";
import "./Notification.css";

class PlayerWin extends React.Component {
  render() {
    console.log("player", this.props.winner, "win");
    let isActive = this.props.winner ? "winner active" : "winner hide";
    console.log(isActive);

    return (
      <div className={isActive}>
        {" "}
        🏆
        <br />
        Player {this.props.winner} has won!
        <button onClick={this.props.onClick}>Play Again?</button>
      </div>
    );
  }
}

export default PlayerWin;
