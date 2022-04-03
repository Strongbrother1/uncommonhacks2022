// CSS Imports
import "./css/main.css";

// Component Imports
import Game from "./components/Game"

import React, { Component, useState, useEffect } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);
  
  return (
    <div>
      <Game/>

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
