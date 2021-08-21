import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import SvgIcon from "@material-ui/core/SvgIcon";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { ethers } from "ethers";
import dataidle from "./abi/idledata.json";
import datadai from "./abi/daidata.json";
import react, { useEffect, useState } from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
const defAdd = "0x0000000000000000000000000000000000000000";
const useStyles = makeStyles({
  gridClass: {
    spacing: 0,
    alignItems: "center",
    justifyAlign: "center",
    justifyContent: "center",
    minHeight: "100vh"
  },
  media: {
    height: 10,
    paddingTop: "56.25%" // 16:9
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
  const a = new ethers.providers.Web3Provider((window as any).ethereum);
  const daiContract = new ethers.Contract(datadai.address, datadai.abi, a);

  const idleContract = new ethers.Contract(dataidle.address, dataidle.abi, a);
  const b = a.getSigner();
  const classes = useStyles();
  const [val, setVal] = useState("0.0");
  const [bal, setBal] = useState("0");
  const [bal2, setBal2] = useState("0");
  const [flag, setFlag] = useState(false);
  const [sign, setSign] = useState(b);
  async function initing() {
    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      let signer = await provider.getSigner();
      console.log(signer);
      let address = await signer.getAddress();
      console.log(address);

      setFlag(true);

      console.log(provider.getSigner());

      balancing();
    } catch (err) {
      console.log(err);
      setFlag(false);
    }
  }
  initing();
  async function balancing() {
    const daiC = daiContract.connect(sign);

    const idleC = idleContract.connect(sign);
    let txx = await daiContract.balanceOf(sign.getAddress());
    let txx2 = await idleContract.balanceOf(sign.getAddress());
    setBal(ethers.utils.formatEther(txx));
    setBal2(ethers.utils.formatEther(txx2));
  }
  //balancing();
  async function deposit() {
    const daiC = daiContract.connnect(sign);

    const idleC = idleContract.connect(sign);
    console.log(sign.getAddress());
    const booler = true;
    //const tx1 = await daiContract.approve(dataidle.address, 5);
    //console.log(tx1);
    const tx = await idleC.mintIdleToken(
      ethers.utils.parseEther(val),
      booler,
      "0x0000000000000000000000000000000000000000"
    );
    console.log(tx);
    balancing();
  }
  async function approve() {
    const daiC = daiContract.connect(sign);
    const tx = await daiC.approve(
      dataidle.address,
      ethers.utils.parseEther("100000.0")
    );
  }
  async function withdraw() {
    const idleC = idleContract.connect(sign);
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
      const signer = new ethers.providers.Web3Provider(
        (window as any).ethereum
      ).getSigner();
      setSign(signer);
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
        <Grid item xs={2}>
          <Card>
            <CardMedia className={classes.media} src="logo.svg" />
          </Card>
          <Card>
            <CardContent>
              <Typography>{bal}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Typography>{bal2}</Typography>
        </Grid>
        <Grid item xs={4}>
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
                disabled={!flag}
              >
                Deposit
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => withdraw()}
                disabled={!flag}
              >
                Withdraw
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => approve()}
                disabled={!flag}
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
