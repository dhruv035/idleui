import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { ethers } from "ethers";
import dataidle from "./abi/idledata.json";
import datadai from "./abi/daidata.json";
import react, { useEffect, useState } from "react";
import { CardActionArea } from "@material-ui/core";
const defAdd = "0x0000000000000000000000000000000000000000";
const useStyles = makeStyles({
  gridClass: {
    spacing: 0,
    alignItems: "center",
    justifyAlign: "center",
    justifyContent: "center",
    minHeight: "100vh"
  },
  root: {
    flexGrow: 1,
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});
function App() {
  const classes = useStyles();
  const [val, setVal] = useState("0.0");
  const [bal, setBal] = useState("0");
  const [bal2, setBal2] = useState("0");
  const [flag, setFlag] = useState(false);

  async function initing() {
    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      let address = await provider.getSigner(0).getAddress();
      if (address) {
        setFlag(true);
        console.log(address);
        balancing();
      }
    } catch (err) {
      console.log(err);
      setFlag(false);
    }
  }
  initing();
  async function balancing() {
    const signer = new ethers.providers.Web3Provider(
      (window as any).ethereum
    ).getSigner();

    const daiContract = new ethers.Contract(
      datadai.address,
      datadai.abi,
      signer
    );

    const idleContract = new ethers.Contract(
      dataidle.address,
      dataidle.abi,
      signer
    );
    let txx = await daiContract.balanceOf(signer.getAddress());
    let txx2 = await idleContract.balanceOf(signer.getAddress());
    setBal(ethers.utils.formatEther(txx));
    setBal2(ethers.utils.formatEther(txx2));
  }
  //balancing();
  async function deposit() {
    const signer = new ethers.providers.Web3Provider(
      (window as any).ethereum
    ).getSigner();

    const daiContract = new ethers.Contract(
      datadai.address,
      datadai.abi,
      signer
    );

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
  async function login() {
    let accounts = await (window as any).ethereum.request({
      method: "eth_requestAccounts"
    });
    if (accounts) {
      balancing();
      setFlag(true);
    }
  }

  return (
    <div className="App">
      <Grid
        container
        className={classes.gridClass}
        direction="column"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <Typography>{bal}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>{bal2}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardContent>
                <TextField
                  id="standard-basic"
                  type="text"
                  label="Standard"
                  onChange={e => handleChange(e.target.value)}
                ></TextField>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => deposit()}
              >
                Deposit
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => withdraw()}
              >
                Withdraw
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => approve()}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => login()}
                disabled={flag}
              >
                MetaMask Login
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
