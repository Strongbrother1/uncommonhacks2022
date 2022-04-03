import React, { useEffect } from "react";
import Balance from "./Balance";
import LobbyRow from "./LobbyRow";
import "./LobbyRow.css";
import axios from "axios";

export default function Lobby({ account }) {
    const [lobbyData, setLobbyData] = React.useState(null);
    useEffect(() => {
        async function init() {
            let { data } = await axios.get(`http://${window.location.hostname}:4001/api/lobbies`);
            setLobbyData(data);
        }

        init();
    }, []);

    if (lobbyData == null) {
        return <></>;
    }

    console.log(lobbyData);

    return (
        <div>
            <div className="lobbycontainer">
                <h3 id="title">High Stakes Agar.io</h3>
                <br />
                <Balance />

                <br />

                {Object.entries(lobbyData).map(([lobby_id, lobby]) => (
                    <LobbyRow lobby={{ ...lobby, lobby_id }} />
                ))}
            </div>
        </div>
    );
}
