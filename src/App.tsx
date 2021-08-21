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
import Paper from "@material-ui/core/Paper";
import react, { useEffect, useState } from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import daiImage from "./imgofdai.jpg";
import idaiImage from "./idle.jpeg";
import { hexZeroPad } from "ethers/lib/utils";
const defAdd = "0x0000000000000000000000000000000000000000";
const useStyles = makeStyles(theme => ({
  gridClass: {
    spacing: 0,
    alignItems: "center",
    justifyAlign: "center",
    justifyContent: "center"
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1500,
    maxheight: 1500
  },
  media: {
    height: 50,
    width: 50
    // 16:9
  },
  root: {
    display: "flex"
  },
  balanceCard: {
    display: "flex",
    flexDirection: "row"
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
}));
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

  function truncate(str: string, maxDecimalDigits: number) {
    if (str.includes(".")) {
      const parts = str.split(".");
      return parts[0] + "." + parts[1].slice(0, maxDecimalDigits);
    }
    return str;
  }

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
    let txx = await daiC.balanceOf(sign.getAddress());
    let txx2 = await idleC.balanceOf(sign.getAddress());

    let display1 = ethers.utils.formatEther(txx);
    setBal(truncate(display1, 4));
    let display2 = ethers.utils.formatEther(txx2);
    setBal2(truncate(display2, 4));
  }
  //balancing();
  async function deposit() {
    const idleC = idleContract.connect(sign);
    console.log(sign.getAddress());
    const booler = true;

    const a = new ethers.providers.Web3Provider((window as any).ethereum);

    let filter = {
      address: dataidle.address,
      topics: [
        ethers.utils.id("Transfer(address,address,uint256)"),
        null,
        hexZeroPad(await sign.getAddress(), 32)
      ]
    };
    //check listeners
    a.on(filter, (log, event) => {
      console.log();
      balancing();
    });

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
    const a = new ethers.providers.Web3Provider((window as any).ethereum);
    const idleC = idleContract.connect(sign);
    const abc = await idleC.redeemIdleToken(ethers.utils.parseEther(val));
    console.log(abc);

    let filter = {
      address: dataidle.address,
      topics: [
        ethers.utils.id("Transfer(address,address,uint256)"),
        hexZeroPad(await sign.getAddress(), 32),
        null
      ]
    };

    a.on(filter, (log, event) => {
      console.log();
      balancing();
      // Emitted any token is sent TO either address
    });
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
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid
          container
          spacing={2}
          className={classes.gridClass}
          direction="column"
          alignItems="center"
        >
          <Typography variant="h2" component="h5">
            IDLE
          </Typography>
          <Typography variant="h4" component="h5" hidden={!flag}>
            Logged In
          </Typography>
        </Grid>
        <Grid
          container
          spacing={2}
          className={classes.gridClass}
          direction="row"
          alignItems="center"
        >
          <Grid item xs={5}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="h2"
              align="center"
            >
              Dai Balance
            </Typography>
            <Card className={classes.balanceCard}>
              <CardMedia className={classes.media} image={daiImage}></CardMedia>
              <CardContent>
                <Typography>{bal}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={5}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="h2"
              align="center"
            >
              idleDai Balance
            </Typography>
            <Card className={classes.balanceCard}>
              <CardMedia className={classes.media} image={daiImage}></CardMedia>
              <CardMedia
                className={classes.media}
                image={idaiImage}
              ></CardMedia>
              <CardContent>
                <Typography>{bal2}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          className={classes.gridClass}
          direction="row"
          alignItems="center"
        >
          <Grid item xs={10}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <TextField
                    id="standard-basic"
                    type="text"
                    label="Enter Amount"
                    onChange={e => handleChange(e.target.value)}
                  ></TextField>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => deposit()}
                  disabled={!parseFloat(val) || !flag}
                >
                  Deposit
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => withdraw()}
                  disabled={(!parseFloat(val) || !flag) && val != "0"}
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
      </Paper>
    </div>
  );
}

export default App;
