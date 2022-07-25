const { ethers, providers } = require("ethers"); 
const ABI = require('./lpAbi.json')

const provider = new ethers.providers.JsonRpcProvider('https://rpc.testnet.cloudwalk.io')

const address = '0xd0D22E0A7b0a7fddd9A87A1fB6918FACA31e2458' // Liquidity pool contract address

const signer = new ethers.Wallet('a32bf07df68bfc5267252a4f891ec23c23430b1393c4176794f0ebc42a72627c', provider)

const contract = new ethers.Contract(address, ABI, signer) 

const main = async () => {
    const options = {gasLimit: 3e7}; // se usar esse gasLimit aí nao dá erro 
    // const name = await contract.transferERC20('0x0D50AB2b552A2D2e6cdaFd367e6e78f392A2f06F', 50000, options);    

    // const balance = await contract.getBalanceERC20();
    // console.log(parseInt(balance._hex, 16));
    console.log(await contract.name());

    // const some = await contract.withdrawTokens(10, options);
    // console.log(some)

}

main()





