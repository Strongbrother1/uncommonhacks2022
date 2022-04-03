import { useEffect, useState } from "react";
import GameMoney from "../contracts/GameMoney.json";
import getWeb3 from "../getWeb3";
import React from "react";
import { accountContext, contractContext, web3Context } from "../context";
import { Button, Card, Modal, Form } from "react-bootstrap";

export default function Balance() {
    const [balance, setBalance] = useState(null);
    const [showDeposit, setShowDeposit] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);
    const [showBalance, setShowBalance] = useState(false);
    const [depositAmount, setDepositAmount] = useState(0);
    const web3 = React.useContext(web3Context);
    const account = React.useContext(accountContext);
    const contract = React.useContext(contractContext);

    async function getBalance() {
        let b = await contract.methods.getBalance().call();
        console.log("Balance", b);
        setBalance(web3.utils.fromWei(b, "ether").toString());
    }

    useEffect(() => {
        getBalance();
    }, []);

    const handleDeposit = () => {
        setShowDeposit(true);
    };

    const handleDepositProceed = async () => {
        setShowDeposit(false);
        const amount = web3.utils.toWei(depositAmount, "ether");
        let txn = await contract.methods.deposit().send({ value: amount, from: account });
        console.log(txn);
        getBalance();
    };

    const handleWithdraw = async () => {
        let txn = await contract.methods.withdraw().send({ from: account });
        getBalance();
    };

    return (
        <Card style={{ padding: "1rem" }}>
            <p>Your balance: {balance} ETH</p>
            <br />
            <Button variant="success" onClick={handleDeposit}>
                Deposit
            </Button>
            <br />
            <Button variant="warning" onClick={handleWithdraw}>
                Withdraw
            </Button>

            <Modal show={showDeposit} onClose={() => setShowDeposit(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Deposit funds</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Label>Enter Deposit Amount in ETH</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter deposit..."
                        onChange={(event) => setDepositAmount(event.target.value)}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeposit(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleDepositProceed}>
                        Proceed
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
}
