import * as dotenv from "dotenv";
import axios from "axios";
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

async function listenEmailVerificationRequested() {
  console.log("Waiting for email verification requested event...");
  headProfileContract.on(
    "EmailVerificationRequested",
    async (address, email) => {
      //get user's email verifiction number
      const resultInfo = await headProfileContract.getProfileInfoByAddress(
        address
      );
      if (resultInfo["isEmailVerified"].toString() == "true") {
        return;
      }

      console.log(
        "send email to:" +
          email +
          ", verification number:" +
          resultInfo["emailVerifyNumber"]
      );

      try {
        await axios({
          url: "/api/v1.0/email/send",
          method: "post",
          baseURL: "https://api.emailjs.com",
          data: {
            service_id: process.env.APP_EMAILJS_SERVICE_ID,
            template_id: process.env.APP_EMAILJS_TEMPLATE_ID,
            user_id: process.env.APP_EMAILJS_USER_ID,
            accessToken: process.env.APP_EMAILJS_ACCESSTOKEN,
            template_params: {
              email: email,
              team_name: "CryptoHead",
              message: resultInfo["emailVerifyNumber"].toString(),
            },
          },
        }).then(function (response) {
          console.log(response);
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          // 👇️ error: AxiosError<any, any>
          return error.message;
        } else {
          console.log("unexpected error: ", error);
          return "An unexpected error occurred";
        }
      }
    }
  );
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
