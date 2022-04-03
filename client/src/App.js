// CSS Imports
// Component Imports
import Game from "./components/Game";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import React, { Component, useState, useEffect } from "react";
import getWeb3 from "./getWeb3";

import socketIOClient from "socket.io-client";
import Lobby from "./components/Lobby";
import GameMoney from "./contracts/GameMoney.json";
import { web3Context, contractContext, accountContext } from "./context";
import GameRoom from "./components/GameRoom";
const ENDPOINT = "http://127.0.0.1:4001";
function App() {
    const [response, setResponse] = useState("");
    const [account, setAcc] = useState(null);
    const [contract, setContract] = useState(null);
    const [web3, setWeb3] = useState(null);

    useEffect(() => {
        async function init() {
            // Connect to Socket
            // const socket = socketIOClient(ENDPOINT);
            // socket.on("FromAPI", (data) => {
            //     setResponse(data);
            // });

            // console.log("running");
            // // Get network provider and web3 instance.
            // const web3 = await getWeb3();
            // console.log("web3", web3);
            // // Use web3 to get the user's accounts.
            // const acc = (await web3.eth.getAccounts())[0];
            // setAcc(acc);
            // console.log("Accounts", acc);

            // try {
            //     const wallet_data = { acc };
            //     console.log("wallet", wallet_data);
            //     socket.emit("playerLogin", wallet_data);
            // } catch (error) {
            //     alert(`Failed to load web3 or accounts. Check console for details.`);
            // }

            const web3 = await getWeb3();
            setWeb3(web3);
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = GameMoney.networks[networkId];
            const contract = new web3.eth.Contract(GameMoney.abi, deployedNetwork && deployedNetwork.address);
            setContract(contract);
            const acc = (await web3.eth.getAccounts())[0];
            setAcc(acc);

            console.log("acc", acc, "contract", contract);
        }
        init();
    }, []);

    if (account == null) {
        return (
            <div style={{ textAlign: "center" }}>
                <h1 style={{ color: "white", fontSize: "4rem" }}>Please Sign in through Metamask</h1>
            </div>
        );
    }

    const Web3Provider = web3Context.Provider;
    const ContractProvider = contractContext.Provider;
    const AccountProvider = accountContext.Provider;

    return (
        <div style={{ padding: "1rem" }}>
            <Web3Provider value={web3}>
                <ContractProvider value={contract}>
                    <AccountProvider value={account}>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Lobby />} />
                                <Route path="/game/:lobby_id" element={<GameRoom />} />
                            </Routes>
                        </BrowserRouter>
                    </AccountProvider>
                </ContractProvider>
            </Web3Provider>
        </div>
    );
}

//class App extends Component {
//  state = { storageValue: 0, web3: null, accounts: null, contract: null };
//
//  // componentDidMount = async () => {
//  //   try {
//  //     // Get network provider and web3 instance.
//  //     const web3 = await getWeb3();
//
//  //     // Use web3 to get the user's accounts.
//  //     const accounts = await web3.eth.getAccounts();
//
//  //     // Get the contract instance.
//  //     const networkId = await web3.eth.net.getId();
//  //     const deployedNetwork = SimpleStorageContract.networks[networkId];
//  //     const instance = new web3.eth.Contract(
//  //       SimpleStorageContract.abi,
//  //       deployedNetwork && deployedNetwork.address
//  //     );
//
//  //     // Set web3, accounts, and contract to the state, and then proceed with an
//  //     // example of interacting with the contract's methods.
//  //     this.setState({ web3, accounts, contract: instance }, this.runExample);
//  //   } catch (error) {
//  //     // Catch any errors for any of the above operations.
//  //     alert(
//  //       `Failed to load web3, accounts, or contract. Check console for details.`
//  //     );
//  //     console.error(error);
//  //   }
//  // };
//
//  runExample = async () => {
//    const { accounts, contract } = this.state;
//
//    // Stores a given value, 5 by default.
//    await contract.methods.set(5).send({ from: accounts[0] });
//
//    // Get the value from the contract to prove it worked.
//    const response = await contract.methods.get().call();
//
//    // Update state with the result.
//    this.setState({ storageValue: response });
//  };
//
//  render() {
//    // if (!this.state.web3) {
//    //   return <div>Loading Web3, accounts, and contract...</div>;
//    // }
//    return (
//      <div>
//        <Game/>
//      </div>
//    );
//  }
//}

export default App;
