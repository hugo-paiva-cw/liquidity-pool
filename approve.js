const { ethers, providers } = require("ethers");
const ABI = require("./brlcABI.json");

const provider = new ethers.providers.JsonRpcProvider(
  "https://rpc.testnet.cloudwalk.io"
);

const brlcContractaddress = "0xC6d1eFd908ef6B69dA0749600F553923C465c812"; // Liquidity pool contract address

const signer = new ethers.Wallet(
  "83c2458f04be0b2f206df35d9b27a9cc0d063d9eb87cf8388506b0ed0a844327",
  provider
);

const contract = new ethers.Contract(brlcContractaddress, ABI, signer);

const main = async () => {
  const options = { gasLimit: 3e5 }; // se usar esse gasLimit aí nao dá erro
  const myWallet = "0x440B5d69C45775a6905a9f8E1e157cbF74f7A56b";
  const lpAddress = "0xA851253AA16baD9f1346E375ECC3E34041d3F233";
  console.log(await contract.increaseAllowance(lpAddress, 100000));
  const balance = await contract.allowance(myWallet, lpAddress);
  console.log(parseInt(balance._hex, 16));
};

main();
