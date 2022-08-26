const { ethers, providers } = require("ethers");
const ABI = require("./brlcABI.json");

const provider = new ethers.providers.JsonRpcProvider(
  "https://rpc.testnet.cloudwalk.io"
);

const brlcContractaddress = "0xC6d1eFd908ef6B69dA0749600F553923C465c812"; // Liquidity pool contract address

const signer = new ethers.Wallet(
  "a32bf07df68bfc5267252a4f891ec23c23430b1393c4176794f0ebc42a72627c",
  provider
);

const contract = new ethers.Contract(brlcContractaddress, ABI, signer);

const main = async () => {
  const options = { gasLimit: 3e5 }; // se usar esse gasLimit aí nao dá erro
  const myWallet = "0x0D50AB2b552A2D2e6cdaFd367e6e78f392A2f06F";
  const lpAddress = "0xA851253AA16baD9f1346E375ECC3E34041d3F233";
  console.log(await contract.approve(lpAddress, 100000));
  const balance = await contract.allowance(myWallet, lpAddress);
  console.log(parseInt(balance._hex, 16));
};

main();
