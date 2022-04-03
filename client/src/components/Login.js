import React, { useEffect } from "react"
import "./../css/main.css"

import getWeb3 from "./../getWeb3";

export default function Login() {
  const handleLogin = async () => {
    console.log('running')
    // Get network provider and web3 instance.
    const web3 = await getWeb3();
    console.log("web3", web3)
    // Use web3 to get the user's accounts.
    const accounts = (await web3.eth.getAccounts())[0];
    console.log("Accounts", accounts)
    return {web3: web3, acc: accounts}
  }

  //return {status: true, web3: web3, acc: accounts}

  return (
    <div>
      <div id="loginWrapper">
        <div id="loginMenu">
          <p>High Stakes Agar.io</p>
          <button id="loginButton" class="general_button" onClick={handleLogin}>Login Using Metamask</button>

        </div>
      </div>
    </div>
  )
}