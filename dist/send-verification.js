"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const HeadProfile_1 = require("./abi/HeadProfile");
var url = "http://127.0.0.1:8545";
var customHttpProvider = new ethers_1.ethers.providers.JsonRpcProvider(url);
const signer = new ethers_1.ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", customHttpProvider);
var headProfileContract = new ethers_1.ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", HeadProfile_1.headProfileAbi, signer);
customHttpProvider.getBlockNumber().then((result) => {
    console.log("Current block number:" + result);
});
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Executed now");
        //await delay(1000);
        yield testA();
        console.log("end");
    });
}
function delay(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}
function testA() {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
init();
//# sourceMappingURL=send-verification.js.map