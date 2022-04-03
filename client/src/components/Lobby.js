import React from "react";
import LobbyRow from "./LobbyRow";
import "./LobbyRow.css"

export default function Lobby() {
    const lobby_data = [
        {
            lobby_id: "0x123",
            buy_in: 1,
            players: 5,
            time_left: 30
        },
        {
            lobby_id: "0x456",
            buy_in: 2,
            players: 2,
            time_left: 20
        },
        {
            lobby_id: "0x456",
            buy_in: 2,
            players: 2,
            time_left: 20
        }
    ]
    return (
        <div>
            <div class="lobbycontainer">
                <h3 id="title">High Stakes Agar.io</h3>

                {
                    lobby_data.map(lobby => <LobbyRow lobby_id={lobby.lobby_id} 
                                                        buy_in={lobby.buy_in} 
                                                        players={lobby.players}
                                                        time_left={lobby.time_left}  />)
                }
            </div>
        </div>
    )
}