import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { ethers } from "ethers";
import dataidle from "./abi/idledata.json";
import datadai from "./abi/daidata.json";
import react, { useEffect, useState } from "react";
const defAdd = "0x0000000000000000000000000000000000000000";

function App() {
  const [val, setVal] = useState("0.0");
  async function deposit() {
    const signer = new ethers.providers.Web3Provider(
      (window as any).ethereum
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
      ethers.utils.parseEther(val),
      booler,
      "0x0000000000000000000000000000000000000000"
    );
    console.log(tx);
  }
  async function approve() {
    const signer = new ethers.providers.Web3Provider(
      (window as any).ethereum
    ).getSigner();
    const daiContract = new ethers.Contract(
      datadai.address,
      datadai.abi,
      signer
    );
    const tx = await daiContract.approve(
      dataidle.address,
      ethers.utils.parseEther("100000.0")
    );
  }
  async function withdraw() {
    const signer = new ethers.providers.Web3Provider(
      (window as any).ethereum
    ).getSigner();

    const idleContract = new ethers.Contract(
      dataidle.address,
      dataidle.abi,
      signer
    );
    const abc = await idleContract.redeemIdleToken(
      ethers.utils.parseEther(val)
    );
    console.log(abc);
  }
  function handleChange(e: string | any) {
    if (e) setVal(e);
    else setVal("0.0");
  }

  return (
    <div className="App">
      <Button variant="contained" color="primary" onClick={() => deposit()}>
        Deposit
      </Button>
      <Button variant="contained" color="primary" onClick={() => withdraw()}>
        Withdraw
      </Button>
      <Button variant="contained" color="primary" onClick={() => approve()}>
        Approve
      </Button>
      <TextField
        id="standard-basic"
        type="text"
        label="Standard"
        onChange={e => handleChange(e.target.value)}
      ></TextField>
    </div>
  );
}

export default App;
