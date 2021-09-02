import { createWatcher } from "@makerdao/multicall";
export const Watch = async () => {
  const MKR_TOKEN = "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa";
  const MKR_WHALE = "0x037245d2DDcE683436520EFc84590e1F6Fb043fD";
  const MKR_FISH = "0xa500B2427458D12Ef70dd7b1E031ef99d1cc09f7";

  const config = {
    rpcUrl: "https://kovan.infura.io/v3/170121f3e23247b498d8423dfbda782c",
    multicallAddress: "0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a"
  };
  let result;
  const watcher = createWatcher(
    [
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
    ],
    config
  );

  watcher.batch().subscribe(updates => {
    result = updates;
  });

  await watcher.start();
  watcher.stop();
  return result;
};
