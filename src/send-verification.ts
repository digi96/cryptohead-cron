import { ethers, utils } from "ethers";
import { headProfileAbi } from "./abi/HeadProfile";
var url = "http://127.0.0.1:8545";
var customHttpProvider = new ethers.providers.JsonRpcProvider(url);
const signer = new ethers.Wallet(
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  customHttpProvider
);
var headProfileContract = new ethers.Contract(
  "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  headProfileAbi,
  signer
);
customHttpProvider.getBlockNumber().then((result) => {
  console.log("Current block number:" + result);
});

async function init() {
  console.log("Executed now");
  //await delay(1000);
  await testA();
  console.log("end");
}

function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function testA() {
  console.log("waiting for event...");
  var filter = {
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    topics: [
      "0x123f26a2e49413178f9987a12875a1c3699d80db989d54b4fce93c6a5e9050ec",
    ],
  };
  customHttpProvider.on(filter, (log) => {
    console.log("New profile has been created");
    console.log(log);
  });

  headProfileContract.on("ProfileCreated", (log) => {
    console.log("New profile created");
    console.log(log);
  });
  //await delay(100000);
}

init();
