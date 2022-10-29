import * as dotenv from 'dotenv';
import { ethers } from "ethers";
import { headProfileAbi } from "./abi/HeadProfile";


dotenv.config();
var url = process.env.APP_PROVIDER_URL;
var customHttpProvider = new ethers.providers.JsonRpcProvider(url);
const signer = new ethers.Wallet(
  process.env.APP_CONTRACT_OWNER_KEY,
  customHttpProvider
);
var headProfileContract = new ethers.Contract(
  process.env.APP_CONTRACT_ADDRESS,
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

async function listenEmailVerificationRequested(){
  console.log("Waiting for email verification requested event...");
  headProfileContract.on("EmailVerificationRequested", async (address, email) => {
    //get user's email verifiction number
    const resultInfo = await headProfileContract.getProfileInfoByAddress(address);  
    console.log("send email to:"+ email + ", verification number:"+ resultInfo["emailVerifyNumber"]);
  });
}

async function main() {
  listenProfileCreation();
  listenEmailVerificationRequested();

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
