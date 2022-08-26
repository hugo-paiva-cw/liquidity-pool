const { ethers, providers } = require("ethers");
const ABI = require("./lpAbi.json");

const provider = new ethers.providers.JsonRpcProvider(
  "https://rpc.testnet.cloudwalk.io"
);

const address = "0x3B796920Da217664919a8B67C690faE9125df108"; // Liquidity pool contract address

const signer = new ethers.Wallet(
  "a32bf07df68bfc5267252a4f891ec23c23430b1393c4176794f0ebc42a72627c",
  provider
);

const contract = new ethers.Contract(address, ABI, signer);

const main = async () => {
  const options = { gasLimit: 3e7 }; // se usar esse gasLimit aí nao dá erro
  // const name = await contract.transferERC20('0x0D50AB2b552A2D2e6cdaFd367e6e78f392A2f06F', 50000, options);

  // const balance = await contract.getBalanceERC20();
  // console.log(parseInt(balance._hex, 16));
  const myWallet = "0x0D50AB2b552A2D2e6cdaFd367e6e78f392A2f06F";
  const balance = await contract.allowance(myWallet, address);
  console.log(await contract.deposit(50000, options));
  console.log(await contract.totalAssets());

  // const some = await contract.withdrawTokens(10, options);
  // console.log(some)
};

main();
