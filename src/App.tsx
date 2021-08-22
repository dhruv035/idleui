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
import { ethers, providers } from "ethers";
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
    flexDirection: "row",
    minHeight: 100
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
  const [daiBal, setDaiBal] = useState("0");
  const [idleBal, setIdleBal] = useState("0");
  const [enableUI, setEnableUI] = useState(false);
  const [sign, setSign] = useState(b);
  const [chainFlag, setChainFlag] = useState(false);
  const [apr, setApr] = useState("0.0");
  const [tokenPrice, setTokenPrice] = useState("0");
  const [govTokenBalance, setGovTokenBalance] = useState("0");

  console.log("IdleAddress = " + dataidle.address);

  useEffect(() => {
    async function initing() {
      let result = ethers.utils.formatEther(await idleContract.getAvgAPR());
      setApr(truncate(result, 5));
      result = ethers.utils.formatEther(await idleContract.tokenPrice());
      setTokenPrice(truncate(result, 5));
      try {
        const provider = new ethers.providers.Web3Provider(
          (window as any).ethereum
        );
        const chainId = await (window as any).ethereum.request({
          method: "eth_chainId"
        });
        if (chainId != 42) {
          throw "Wrong Chain";
        }
        let signer = await provider.getSigner();
        console.log(signer);
        let address = await signer.getAddress();
        console.log(address);

        setEnableUI(true);

        console.log(provider.getSigner());
        console.log("balance possible");
      } catch (err) {
        console.log(err);

        setEnableUI(false);
      }
      balancing();
    }
    initing();
  });

  function truncate(str: string, maxDecimalDigits: number) {
    if (str.includes(".")) {
      const parts = str.split(".");
      return parts[0] + "." + parts[1].slice(0, maxDecimalDigits);
    }
    return str;
  }

  async function balancing() {
    try {
      const chainId = await (window as any).ethereum.request({
        method: "eth_chainId"
      });
      if (chainId != 42) {
        throw "Wrong Chain";
      }

      let txx = await daiContract.balanceOf(sign.getAddress());
      let txx2 = await idleContract.balanceOf(sign.getAddress());
      let txx3 = await idleContract.getGovTokensAmounts(sign.getAddress());
      console.log("GOV BALANCE  " + txx3);

      let display1 = ethers.utils.formatEther(txx);
      setDaiBal(truncate(display1, 4));
      let display2 = ethers.utils.formatEther(txx2);
      setIdleBal(truncate(display2, 4));
      let display3 = ethers.utils.formatEther(txx3);
      setGovTokenBalance(truncate(display3, 4));
    } catch (err) {
      setDaiBal("0");
      setIdleBal("0");
    }
  }
  //balancing();

  async function approve() {
    const daiC = daiContract.connect(sign);
    const tx = await daiC.approve(
      dataidle.address,
      ethers.utils.parseEther("100000.0")
    );
  }
  async function listener(input: number) {
    const a = new ethers.providers.Web3Provider((window as any).ethereum);
    let filter1 = {
      address: dataidle.address,
      topics: [
        ethers.utils.id("Transfer(address,address,uint256)"),
        hexZeroPad(await sign.getAddress(), 32),
        null
      ]
    };
    let filter2 = {
      address: dataidle.address,
      topics: [
        ethers.utils.id("Transfer(address,address,uint256)"),
        null,
        hexZeroPad(await sign.getAddress(), 32)
      ]
    };
    if (input == 1) {
      a.on(filter1, (log, event) => {
        balancing();
      });
    } else if (input == 2) {
      a.on(filter2, (log, event) => {
        balancing();
      });
    }
    setVal("");
  }
  async function deposit() {
    const idleC = idleContract.connect(sign);
    console.log(sign.getAddress());
    const booler = true;
    const tx = await idleC.mintIdleToken(
      ethers.utils.parseEther(val),
      booler,
      "0x0000000000000000000000000000000000000000"
    );
    console.log(tx);
    setVal("");
    listener(2);
  }
  async function withdraw() {
    const idleC = idleContract.connect(sign);
    const abc = await idleC.redeemIdleToken(ethers.utils.parseEther(val));
    console.log(abc);

    listener(1);
  }
  async function redeem() {
    const idleC = idleContract.connect(sign);
    const abc = await idleC.redeemIdleToken(ethers.utils.parseEther("0"));
    console.log(abc);

    listener(1);
  }
  function handleChange(e: string | any) {
    if (e) setVal(e);
    else setVal("");
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
      setEnableUI(true);
    }
  }
  (window as any).ethereum.on("chainChanged", (chainId: number) => {
    if (chainId == 42) setChainFlag(false);
    else setChainFlag(true);
  });

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
          <Typography variant="h4" component="h5" hidden={!enableUI}>
            Logged In
          </Typography>
          <Typography variant="h4" component="h5" hidden={!chainFlag}>
            Wrong Chain
          </Typography>
          <Typography variant="h4" component="h5">
            APR is {apr}%
          </Typography>
          <Typography variant="h4" component="h5">
            Token Price is {tokenPrice}
          </Typography>
          <Typography variant="h4" component="h5">
            Token Balance is {govTokenBalance}
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
                <Typography>{daiBal}</Typography>
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
                <Typography>{idleBal}</Typography>
                <Typography>
                  {(parseFloat(tokenPrice) * parseFloat(idleBal)).toPrecision(
                    6
                  )}
                  (in Dai)
                </Typography>
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
                    value={val}
                    onChange={e => handleChange(e.target.value)}
                  ></TextField>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => deposit()}
                  disabled={
                    !parseFloat(val) ||
                    !enableUI ||
                    parseFloat(daiBal) < parseFloat(val)
                  }
                >
                  Deposit
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => withdraw()}
                  disabled={
                    !parseFloat(val) ||
                    !enableUI ||
                    parseFloat(idleBal) < parseFloat(val)
                  }
                >
                  Withdraw
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => redeem()}
                  disabled={!enableUI}
                >
                  Redeem IDLE
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => approve()}
                  disabled={!enableUI}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => login()}
                  disabled={enableUI || chainFlag}
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
