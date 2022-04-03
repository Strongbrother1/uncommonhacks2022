import React from "react";
import { shortenAddress } from "../utils";
import "./LobbyRow.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { accountContext, contractContext, web3Context } from "../context";
import axios from "axios";

export default function LobbyRow({ lobby }) {
    const web3 = React.useContext(web3Context);
    const account = React.useContext(accountContext);
    const contract = React.useContext(contractContext);
    const navigate = useNavigate();
    const handleJoin = async () => {
        if (!lobby.players.includes(account)) {
            console.log("lobby", lobby.lobby_id);
            let txn = await contract.methods.joinLobby(lobby.lobby_id).send({ from: account });
            await axios.post(`http://localhost:4001/api/lobbies/${lobby.lobby_id}/join`, {
                transactionReceipt: txn,
                account,
            });
        }
        navigate(`/game/${lobby.lobby_id}`);
    };

    return (
        <div class="lobbyRowContainer">
            <p> Room Number: {lobby.lobby_id} </p>
            <p> Buy In: {web3.utils.fromWei(lobby.buy_in)} ETH </p>
            <p> Rake: {web3.utils.fromWei(lobby.rake)} ETH </p>

            <p>
                Players: {lobby.players.length}/{lobby.num_players}{" "}
            </p>

            <Button style={{ width: "5rem" }} onClick={handleJoin}>
                Join
            </Button>
        </div>
    );
}
