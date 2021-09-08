import { Button, Typography } from "@material-ui/core";
import react, { useState, useEffect } from "react";
import { Watch } from "./testing";
const MKR_TOKEN = "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa";
const MKR_WHALE = "0x037245d2DDcE683436520EFc84590e1F6Fb043fD";
const MKR_FISH = "0xa500B2427458D12Ef70dd7b1E031ef99d1cc09f7";
function QueueCall() {
  const [queue, setQueue] = useState([]);
  const [parray, setParray] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [result, setResult] = useState([]);
  Watch();
  /*useEffect(() => {
    console.log("Length is ", queue.length);
  }, [queue]);

  console.log("B ", data1);
  console.log("A ", data2);
  const call1 = {
    target: MKR_TOKEN,
    call: ["balanceOf(address)(uint256)", MKR_WHALE],
    returns: [["BALANCE_OF_MKR_WHALE", val => val / 10 ** 18]]
  };

  const call2 = {
    target: MKR_TOKEN,
    call: ["balanceOf(address)(uint256)", MKR_FISH],
    returns: [["BALANCE_OF_MKR_FISH", val => val / 10 ** 18]]
  };

  const calls = [
    {
      target: MKR_TOKEN,
      call: ["balanceOf(address)(uint256)", MKR_WHALE],
      returns: [["BALANCE_OF_MKR_WHALE", val => val / 10 ** 18]]
    },
    {
      target: MKR_TOKEN,
      call: ["balanceOf(address)(uint256)", MKR_WHALE],
      returns: [["BALANCE_OF_MKR_WHALE", val => val / 10 ** 18]]
    },
    {
      target: MKR_TOKEN,
      call: ["balanceOf(address)(uint256)", MKR_WHALE],
      returns: [["BALANCE_OF_MKR_WHALE", val => val / 10 ** 18]]
    },
    {
      target: MKR_TOKEN,
      call: ["balanceOf(address)(uint256)", MKR_FISH],
      returns: [["BALANCE_OF_MKR_FISH", val => val / 10 ** 18]]
    },
    {
      target: MKR_TOKEN,
      call: ["balanceOf(address)(uint256)", MKR_WHALE],
      returns: [["BALANCE_OF_MKR_WHALE", val => val / 10 ** 18]]
    },
    {
      target: MKR_TOKEN,
      call: ["balanceOf(address)(uint256)", MKR_WHALE],
      returns: [["BALANCE_OF_MKR_WHALE", val => val / 10 ** 18]]
    },
    {
      target: MKR_TOKEN,
      call: ["balanceOf(address)(uint256)", MKR_FISH],
      returns: [["BALANCE_OF_MKR_FISHE", val => val / 10 ** 18]]
    }
  ];*/
  /*async function handleClick(label) {
    console.log("Label is" + label);
    let offset = queue.length;
    let newqueue = queue;
    if (label == "button1") newqueue.push(call1);
    else if (label == "button2") newqueue.push(call2);
    setQueue(newqueue);
    console.log("Queue", queue);
    //if (queue.length > 1) Clear();
  }*/
  /*let a = ensureQueueIsClear(offset);
    if (label == "button1") {
      let b = data1;
      b.push(result[offset]);
      setData1(b);
    } else if (label == "button2") {
      let b = data2;
      b.push(result[offset]);
      setData2(b);
    }
  }
  async function Clear() {
    console.log("Sending ", queue);
    let received = await ProcessQueue(calls);
    console.log("Received Data", received);
    setResult(received);
    setQueue([]);
    console.log("Data is", result);
  }

  if (queue.length > 6) Clear();
  function ensureQueueIsClear() {
    return new Promise(function(resolve, reject) {
      (function waitForQueue() {
        if (!queue) return resolve();
        setTimeout(waitForQueue, 30);
      })();
    });
  }

  async function getResult() {}
*/
  return (
    <div>
      <Typography>Hello</Typography>
    </div>
  );
}
export default QueueCall;
