import React, { Component } from "react";
import SimpleStorageContract from "./contracts/MetaCoin.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { sender: 0, receiver: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;
    const senderAddress = accounts[0];
    const receiverAddress = "0xdde936058C1f4f6Af78B491205397Da60D753a15";
    // Stores a given value, 5 by default.
    await contract.methods.sendCoin(receiverAddress, 1000).send({ from: senderAddress });

    // Get the value from the contract to prove it worked.
    const sender = await contract.methods.getBalance(senderAddress).call();
    const receiver = await contract.methods.getBalance(receiverAddress).call();

    // Update state with the result.
    this.setState({ sender, receiver });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div>Sender's address: {this.state.sender}</div>
        <div>Receiver's address: {this.state.receiver}</div>
        <button onClick={this.runExample}>Send</button>
      </div>
    );
  }
}

export default App;
