import { Watch, ProcessQueue } from "./batchcall";

const MKR_TOKEN = "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa";
const MKR_WHALE = "0x037245d2DDcE683436520EFc84590e1F6Fb043fD";
const MKR_FISH = "0xa500B2427458D12Ef70dd7b1E031ef99d1cc09f7";

test("check the watcher", () => {
  return Watch().then(result => {
    expect(result[0].type).toBe("BALANCE_OF_MKR_WHALE");
  });
});

test("check the queue feature", () => {
  const calls = [
    {
      target: MKR_TOKEN,
      call: ["balanceOf(address)(uint256)", MKR_WHALE],
      returns: [["BALANCE_OF_MKR_WHALE", val => val / 10 ** 18]]
    },
    {
      target: MKR_TOKEN,
      call: ["balanceOf(address)(uint256)", MKR_FISH],
      returns: [["BALANCE_OF_MKR_FISH", val => val / 10 ** 18]]
    }
  ];
  return ProcessQueue(calls).then(result => {
    expect(result[0].type).toBe("BALANCE_OF_MKR_WHALE");
  });
  calls.push({
    target: MKR_TOKEN,
    call: ["balanceOf(address)(uint256)", MKR_WHALE],
    returns: [["BALANCE_OF_MKR_WHALE", val => val / 10 ** 18]]
  });
  setTimeout(function() {
    return ProcessQueue(calls).then(result => {
      expect(result[2].type).toBe("BALANCE_OF_MKR_WHALE");
    });
  }, 3000);
});
