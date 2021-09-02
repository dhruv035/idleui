import { Watch } from "./batchcall";

test("check the watcher", () => {
  return Watch().then(result => {
    expect(result[0].type).toBe("BALANCE_OF_MKR_WHALE");
  });
});
