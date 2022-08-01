import React, { Component } from "react";
import "./WinnerScore.css";

export default class WinnerScore extends Component {
  render() {
    console.log("player", this.props.winner, "win");
    let isShown = this.props.winner ? "win-score show" : "win-score noshow";
    let plural1 =
      this.props.player1count > 1 || this.props.player1count == 0
        ? "games"
        : "game";
    let plural2 =
      this.props.player2count > 1 || this.props.player2count == 0
        ? "games"
        : "game";
    console.log(isShown);

    return (
      <div className={isShown}>
        Player 1 has won {this.props.player1count} {plural1}
        ! <br />
        <br />
        Player 2 has won {this.props.player2count} {plural2}!
      </div>
    );
  }
}
