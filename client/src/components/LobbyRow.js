import React from "react";
import "./LobbyRow.css"


export default function LobbyRow(props) {
    const lobby_id = props.lobby_id, buy_in = props.buy_in,
          players = props.players, time_left = props.time_left;

    return (
        <div class="lobbyRowContainer">
            <p> Room Number: {lobby_id} </p>
            <p> Buyin: ${buy_in} </p>
            <p> Players: {players}/10 </p>
            <p> Time: {time_left}</p>

            <button id="spectateButton" style={{width: "5rem"}}> Join </button>
        </div>
    )
}