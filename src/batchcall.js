//import { createWatcher } from "@makerdao/multicall";
import { ethers } from "ethers";
import idledata from "./abi/idledata.json";
export const Watch = async () => {
  const BatchProvider = new ethers.providers.JsonRpcBatchProvider(
    "https://kovan.infura.io/v3/170121f3e23247b498d8423dfbda782c"
  );
  const BatchContract = new ethers.Contract(idledata.address, idledata.abi);

  let i = 0;

  function Call() {
    setTimeout(function() {
      let balance = BatchContract.balanceOf(
        "0x037245d2DDcE683436520EFc84590e1F6Fb043fD"
      );
      console.log(balance);
      if (i < 1000) {
        Call();
      }
    }, 10);
  }
  Call();
};
