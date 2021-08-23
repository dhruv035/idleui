import react from "react";
import App from "./App";
import { ethers } from "ethers";
import { Typography } from "@material-ui/core";
function Start() {
  try {
    const a = new ethers.providers.Web3Provider((window as any).ethereum);
    return (
      <div>
        <App />
      </div>
    );
  } catch (err) {
    return (
      <div>
        <Typography>Install MetaMask</Typography>
      </div>
    );
  }
}
export default Start;
