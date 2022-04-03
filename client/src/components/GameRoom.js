import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { shortenAddress } from "../utils";
import { Form } from "react-bootstrap";
import { useInterval } from "../hooks/useInterval";
export default function GameRoom() {
    const { lobby_id } = useParams();
    const [lobby, setLobby] = useState(null);
    async function init() {
        let { data } = await axios.get(`http://localhost:4001/api/lobbies/${lobby_id}`);
        setLobby(data);
    }

    useInterval(() => {
        init();
    }, 1000);

    if (lobby == null) {
        return <div></div>;
    }

    console.log(lobby);
    return (
        <div style={{ textAlign: "center" }}>
            <h1>
                Players: {lobby.players.length} / {lobby.num_players}
            </h1>
            <br />
            <div style={{ padding: "2rem", border: "1px solid black", borderRadius: "1rem", margin: "0 10%" }}>
                {lobby.players.map((player) => (
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p>{shortenAddress(player)}</p>
                        <Form.Check type={"checkbox"} disabled label={`Accepted?`} />
                    </div>
                ))}
            </div>
        </div>
    );
}
