import Button from "@material-ui/core/Button";
import { ethers } from "ethers";
import dataidle from "./abi/idledata.json";
import datadai from "./abi/daidata.json";
function App() {
  window.ethereum.enable();
  //check if Metamask is installed

  async function connection() {
    const signer = new ethers.providers.Web3Provider(
      window.ethereum
    ).getSigner();
    /*const daiContract = new ethers.Contract(
      datadai.address,
      datadai.abi,
      signer
    );*/
    const idleContract = new ethers.Contract(
      dataidle.address,
      dataidle.abi,
      signer
    );
    console.log(signer.getAddress());
    const booler = true;
    //const tx1 = await daiContract.approve(dataidle.address, 5);
    //console.log(tx1);
    const tx = await idleContract.mintIdleToken(
      ethers.utils.parseEther("4.0"),
      booler,
      "0x0000000000000000000000000000000000000000"
    );
    console.log(tx);
  }
  async function deposit() {}

  return (
    <div className="App">
      <Button variant="contained" color="primary" onClick={() => connection()}>
        Primary
      </Button>
      <Button variant="contained" color="primary" onClick={() => deposit()}>
        Deposit
      </Button>
    </div>
  );
}

export default App;
