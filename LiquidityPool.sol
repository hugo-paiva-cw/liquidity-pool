pragma solidity ^0.8.0;

import "./ABDKMath64x64.sol";

contract LiquidityPool {
    struct Investment {
        address investor;
        uint timestampOfDeposit;
        uint amountOfMoney;
    }
    
    address public contractOwner;
    Investment[] public investments;
    uint dailyCDIinPoints = 49037; // fracao de 1% por 1_000_000;
    // mapping(address => bool ) public isInvestor;
    uint secondsPerDay = 86400;

    modifier onlyOwner() {
        require(msg.sender == contractOwner);
        _;
    }

    function invest() public payable {

        Investment memory newInvestment = Investment({
            investor: msg.sender,
            timestampOfDeposit: block.timestamp,
            amountOfMoney: msg.value
        });

        investments.push(newInvestment);
    } 
    function etherToWei(uint valueEther) public returns (uint) {
       return valueEther*(10**18);
    }

    function withdrawTokens(int128 requestedValue) public {
        Investment memory currentInvestment;
        bool investmentIsFound = false;
        uint thisIndex;
        for (uint index = 0; index < investments.length; index++) {
            if (investments[index].investor == msg.sender) {
                currentInvestment = investments[index];
                investmentIsFound = true;
                thisIndex = index;
            }
        }
        require(investmentIsFound);
        // require(requestedValue < currentInvestment.amountOfMoney);

        // uint interest = ABDKMath64x64.toUInt(getInterestSince(currentInvestment.timestampOfDeposit));
        int128 interest = getInterestSince(currentInvestment.timestampOfDeposit);

        // You divide by 2**64 in order to convert the binary notation to normal
        int128 acumulattedDepositPlusInterest = interest * requestedValue;
        uint finalValueEther = ABDKMath64x64.toUInt(acumulattedDepositPlusInterest);
        address customer = currentInvestment.investor;
        bool isCompleted = payable(customer).send(etherToWei(finalValueEther));

        
        if (isCompleted) {
            uint withdrawed = ABDKMath64x64.toUInt(requestedValue * 2**64);
            currentInvestment.amountOfMoney -= etherToWei(withdrawed);
            investments[thisIndex] = currentInvestment;
        }
    }

    function checkMyDeposit() public view returns(uint) {
        Investment memory currentInvestment;
        bool investmentIsFound = false;
        for (uint index = 0; index < investments.length; index++) {
            if (investments[index].investor == msg.sender) {
                currentInvestment = investments[index];
                investmentIsFound = true;
            }
        }
        require(investmentIsFound);

        return currentInvestment.amountOfMoney;
    }

    function checkContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getInterestSince(uint timestampOfDeposit) public view returns (int128) {

        // Get time since deposit in days
        uint currentTime = block.timestamp; // now // you can use either block.timestamp or now to have a unix timestamp
        uint elapsedTimeInSeconds = currentTime - timestampOfDeposit;
        // uint elapsedDays = elapsedTimeInSeconds / secondsPerDay;
        uint elapsedDays = 252;

        // Get interest ratio in binary that in the end converts to 1.05 for example meaning an addition of 5%
        int128 acumulattedInterestInBinary =
        ABDKMath64x64.pow (
        ABDKMath64x64.add (
          ABDKMath64x64.fromUInt(1),
          ABDKMath64x64.div(
            ABDKMath64x64.fromUInt(dailyCDIinPoints),
            ABDKMath64x64.fromUInt(100000000) // 100 do percentual vezes 1_000_000 da fraçao do daily points
         )),
        elapsedDays);

        // uint interest = dailyCDIinPoints ** elapsedDays;
        return acumulattedInterestInBinary;
    }

    function changeCDIinterestRate(uint cdiInPercentualPoints) public onlyOwner {
        // TODO mudar CDI já tem o modifier onlyOwner ai
        // dailyCDI = cdiInPercentualPoints; 
    }
}