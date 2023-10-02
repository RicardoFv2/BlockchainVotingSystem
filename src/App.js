import { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
import NavBar from "./components/NavBar";
import Votacion from "./components/Votacion";
import Votaciones from "./components/contract/Votaciones.json";
function App() {
  const [MetaMask, setMetamask] = useState(false);

  const [web3, setweb3] = useState(null);

  const [contract, setContract] = useState();

  const [account, setAccount] = useState(null);

  const [balance, setBalance] = useState(null);

  const conectarWallet = async () => {
    console.log("Conectar Wallet");

    if (typeof window.ethereum !== "undefined") {
      const web3Instance = new Web3(window.ethereum);
      setweb3(web3Instance);
      try {
        await window.ethereum.enable();

        const accounts = await web3Instance.eth.getAccounts();
        console.log(accounts[0]);
        setAccount(accounts[0]);

        const balanceWei = await web3Instance.eth.getBalance(accounts[0]);
        const balanceEth = web3Instance.utils.fromWei(balanceWei, "ether");
        setBalance(balanceEth);

        const contractInstance = new web3Instance.eth.Contract(
          Votaciones,
          Votaciones && "0x98Fcd706d1AD0Ec2AcF448C911f56340a7C4d9A1"
        );
        setContract(contractInstance);
        console.log("contracInstance ==>", contractInstance);
        console.log(balanceEth);
      } catch (error) {
        console.error(error);
      }
    } else {
      setMetamask(false);
    }
  };

  useEffect(() => {
    conectarWallet();
    async function Wallet() {
      if (typeof window.ethereum !== "undefined") {
        console.log("Si tenemos wallet");
        setMetamask(true);
      } else {
        console.log("No tenemos wallet");
      }
    }
    Wallet();
  }, []);

  return (
    <>
      <div>
        {MetaMask ? (
          <>
            <NavBar
              conectarWallet={conectarWallet}
              mostrarDireccion={account}
              mostrarBalance={balance}
            />
            <Votacion contract={contract} direccion={account} />
          </>
        ) : (
          <div>
            <h1>MAIKI</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
