import { useEffect, useState } from 'react';
import './App.css';
import contract from './contracts/ecom.json';
import { ethers, BigNumber } from 'ethers';
import Header from "./Components/Header";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import AddProduct from './Components/AddProduct';
import Market from './Components/Market';
import { Product } from './Components/Product';
import BuyerDetail from './Components/BuyerDetails';
import { async } from 'q';

const contractAddress = contract.networks[1337].address;
const abi = contract.abi;

function App() {

  const [currentAccount, setCurrentAccount] = useState(null);
  const [nftContract, setnftContract] = useState(null);
  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!")
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
      return account;
    } else {
      console.log("No authorized account found");
    }
    return null;
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }

  const sellerCreation = async (sellerName) => {

    const { ethereum } = window;

    if (ethereum) {
      nftContract.sellerSignUp(sellerName, { value: ethers.utils.parseEther("5") }).then((nftTxn) => {
        nftTxn.wait().catch(err => console.log("Error while txn: ", err));
      }).catch((e) => {
        setErrorMessage(e.data.message);
        console.log("caught error", e.data.message);
      });
    } else {
      console.log("Ethereum object does not exist");
    }
  }
  const [buyer, setBuyer] = useState(false);
  const isBuyer = (nftContract, account) => {
    const { ethereum } = window;
    if (ethereum) {
      nftContract.users(account).then((nftTxn) => {
        setBuyer(true);
      }).catch((e) => {
        setBuyer(false);
      });
    }
  }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }


  const addProduct = async ({ domain, name, price, desc }) => {
    const { ethereum } = window;
    if (ethereum) {
      nftContract.addProduct(domain, name, price, desc).then((nftTxn) => {
        nftTxn.wait().catch(err => console.log("Error while txn: ", err));
        populateMarket(productLen+1, nftContract);
      }).catch((e) => {
        setErrorMessage(e.data.message);
        console.log("caught error", e.data.message);
      });
    }
  }

  const [productLen, setProdLen] = useState();
  const [prodList, setProdList] = useState([]);
  const populateMarket = async (productLen, nftContract) => {
    const { ethereum } = window;
    if (ethereum) {
      const buffer = [];
      for (let index = 0; index < productLen; index++) {
        const productId = await nftContract.allProducts(index);
        const data = await nftContract.products(productId);
        buffer.push({ name: data['productName'], domain: data["productId"], price: data['price'], address: data['seller'], isActive: data["isActive"] })
      }
      setProdList(buffer);
    }
  }

  useEffect(() => {
    const init = async () => {
      const account = await checkWalletIsConnected();
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);
        setnftContract(nftContract);
        const getlength = async () => {
          const length = await nftContract.getProductCount();
          const noOfProducts = BigNumber.from(length._hex).toNumber();
          setProdLen(noOfProducts);
          populateMarket(noOfProducts, nftContract);
        }
        getlength();
        isBuyer(nftContract, account);
      }
    };
    init();
  }, []);

  const onCreateBuyer = ({ name, email }) => {
    const { ethereum } = window;
    if (ethereum) {
      nftContract.createAccount(name, email).then((nftTxn) => {
        nftTxn.wait().catch(err => console.log("Error while txn: ", err));
      }).catch((e) => {
        setErrorMessage(e.data.message);
        console.log("caught error", e.data.message);
      });
    }
  }

  const selectedProduct = ({domain, price}) => {
    const { ethereum } = window;
    const cost = BigNumber.from(price).toString();
    if (ethereum) {
      nftContract.buyProduct(domain, { value: ethers.utils.parseUnits(cost, "wei") }).then(() => {
        setProdList(prodList.map(prod => {
          if(prod.domain === domain) {
            return {...prod, isActive: false};
          }
          return prod;
        }));
      }).catch((e) => {
        setErrorMessage(e.data.message);
        console.log("caught error", e.data.message);
      });
    }
  }

  const [sellerName, setSellerName] = useState('');
  const [errorMessage, setErrorMessage] = useState("");

  return !currentAccount ? connectWalletButton() : (<>
    <Header activeUser={currentAccount} />
    <div className='main-app'>
      <h2 style={{ color: 'red' }}>{errorMessage}</h2>

      <Container>
        <Row className='mb-5'>
          <Col>
            <Form>
              <Form.Group className="mb-3" >
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Seller Name" value={sellerName} onChange={(e) => setSellerName(e.target.value)} />
              </Form.Group>
            </Form>
            <Button variant="primary" onClick={sellerCreation}>
              Create Seller
            </Button>
          </Col>
          <Col>
            <BuyerDetail onCreateBuyer={onCreateBuyer} />
          </Col>
        </Row>
        <Row>
          <Col>
            <AddProduct onAdd={addProduct} />
          </Col>
          <Col>
            {/* <Product /> */}
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Market</h1>
            <Market products={prodList} isBuyer={buyer} selectedProduct={selectedProduct} />
          </Col>
        </Row>
      </Container>
    </div>
  </>)
}

export default App;
