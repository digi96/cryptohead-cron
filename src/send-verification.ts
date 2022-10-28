import { ethers } from "ethers";
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

async function listenProfileCreation() {
  console.log("Waiting for profile creation event...");
  headProfileContract.on(
    "ProfileCreated",
    (userId, userType, displayName, email) => {
      console.log("New profile created");
      console.log(userId.toNumber());
      console.log(userType);
      console.log(displayName);
      console.log(email);
    }
  );
}

async function main() {
  listenProfileCreation();

  console.log("Press any key to quit...");

  process.stdin.on("data", (data) => {
    console.log(`\nYou typed ${data.toString()}`);
    process.exit();
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
