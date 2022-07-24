const { ethers, providers } = require("ethers"); 
const ABI = require('./lpAbi.json')

const provider = new ethers.providers.JsonRpcProvider('https://rpc.testnet.cloudwalk.io')

const address = '0xAada19C1c840a1AAEa94e13d64C6dcD7AbAB20a1' // Liquidity pool contract address

const signer = new ethers.Wallet('a32bf07df68bfc5267252a4f891ec23c23430b1393c4176794f0ebc42a72627c', provider)

const contract = new ethers.Contract(address, ABI, signer) 

const main = async () => {
    const options = {gasLimit: 3e7}; // se usar esse gasLimit aí nao dá erro 
    const name = await contract.transferERC20('0x0D50AB2b552A2D2e6cdaFd367e6e78f392A2f06F', 50000, options);

    const balance = await contract.getBalanceERC20();
    console.log(parseInt(balance._hex, 16));

    // const some = await contract.withdrawTokens(10, options);
    // console.log(some)

}

main()





