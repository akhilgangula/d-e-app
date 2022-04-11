import React, { Component } from "react";
// import marketInstance from "./contracts/NFTMarket.json";
// import nftInstance from "./contracts/NFT.json";
import getWeb3 from "./getWeb3";
import web3 from "web3"
import "./App.css";
import Header from "./Components/Header";
import AddProduct from "./Components/AddProduct";
import { Container, Row, Col } from "react-bootstrap";
import Product from "./Components/Product";
// import Market from "./Components/Market";
class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    market_contract_address: "0xB0c9EcA0f0918D7ff267f875f2a5D21E600CeEc8",
    nft_address: "0x5F0913Ebc9C144d39784c6b85BEe1DCF16792099",
    price: 1000000,
    itemid: null,
    buyer_address: null,
    token: null,
    listed_items: [],
    nft: []
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      // const web3 = await getWeb3();

      // // Use web3 to get the user's accounts.
      // const accounts = await web3.eth.getAccounts();
      // this.setState({ accounts });
      // Get the contract instance.
      // const networkId = await web3.eth.net.getId();
      // const deployedNetwork = marketInstance.networks[networkId];
      // const instance = new web3.eth.Contract(
      //   marketInstance.abi,
      //   deployedNetwork && deployedNetwork.address,
      // );

      // const deployedNFTNetwork = nftInstance.networks[networkId];
      // const nft_instance = new web3.eth.Contract(
      //   nftInstance.abi,
      //   deployedNFTNetwork && deployedNFTNetwork.address,
      // );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // this.setState({ web3, accounts });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  listing = async () => {
    const { accounts, contract: { market } } = this.state;
    const senderAddress = accounts[0];
    // place that token in the market place with listing price as 1 ether
    await market
      .methods
      .createMarketItem(this.state.nft_address, this.state.itemid, this.state.price)
      .send({ from: senderAddress, value: web3.utils.toWei("1", "ether") });
  };

  buy = async () => {
    const { accounts, contract: { market } } = this.state;
    const buyerAddress = accounts[0];

    await market
      .methods
      .createMarketSale(this.state.nft_address, this.state.itemid)
      .send({ from: this.state.buyer_address, value: web3.utils.toWei(this.state.price.toString(), "wei") });

  }

  create = async () => {
    const { accounts, contract: { nft } } = this.state;
    const senderAddress = accounts[0];

    // create an token
    await nft.methods.createToken(this.state.token).send({ from: senderAddress });

    const itemid = await nft.methods.balanceOf(senderAddress).call({ from: senderAddress });
    console.log("items", itemid);
    this.setState({ itemid });
  }

  load_list = async () => {
    const { accounts, contract: { market } } = this.state;
    const senderAddress = accounts[0];
    const list = await market.methods.fetchMarketItems().call({ from: senderAddress });
    this.setState({ listed_items: list });
  }

  myNfts = async () => {
    const { accounts, contract: { market } } = this.state;
    const senderAddress = accounts[0];
    const list = await market.methods.fetchMyNFTs().call({ from: senderAddress });
    this.setState({ nft: list });
  }

  render() {
    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    return (
      <div className="App">
        <Header activeUser={this.state.accounts}></Header>
        <Container>
          <Row>
            <Col>
              <AddProduct />
            </Col>
            <Col>
              <Product />
            </Col>
          </Row>
          <Row>
            <Col>
              {/* <Container> */}
                <h1>Market</h1>
                {/* <Market products={[1, 2, 3, 4, 5, 6, 7, 8]} /> */}
              {/* </Container> */}
            </Col>
          </Row>
        </Container>

        <div>Contract Address: <input type="text" value={this.state.market_contract_address} onChange={(e) => { this.setState({ market_contract_address: e.target.value }) }} /></div>

        <h4>Creating tokens</h4>
        <div>Token: <input type="text" value={this.state.token} onChange={(e) => { this.setState({ token: e.target.value }) }} /></div>
        <button onClick={this.create}>Create</button>

        <h4>Listing item on the market place</h4>
        <div>Listed item: {this.state.itemid}</div>
        <div>Price: <input type="text" value={this.state.price} onChange={(e) => { this.setState({ price: e.target.value }) }} /></div>
        <button onClick={this.listing}>Send</button>

        <h4>Buyer Side</h4>
        <div>Item id: <input type="text" value={this.state.itemid} onChange={(e) => { this.setState({ itemid: e.target.value }) }} /></div>
        <div>Buyer Address: <input type="text" value={this.state.buyer_address} onChange={(e) => { this.setState({ buyer_address: e.target.value }) }} /></div>
        <div>Price: {this.state.price}</div>
        <button onClick={this.buy}>Buy</button>

        <h4>Your Items</h4>
        <button onClick={this.myNfts}>My Items</button>
        <ul>{this.state.nft.map(entry => <li>Seller Address: {entry.seller} Item id: {entry.itemId} nft_contract_address: {entry.nftContract} Price: {entry.price}</li>)}</ul>

        <h4>Listed Items</h4>
        <button onClick={this.load_list}>Refresh</button>
        <ul>{this.state.listed_items.map(entry => <li>Seller Address: {entry.seller} Item id: {entry.itemId} nft_contract_address: {entry.nftContract} Price: {entry.price}</li>)}</ul>

      </div>
    );
  }
}

export default App;
