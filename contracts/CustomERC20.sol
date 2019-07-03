// contracts/CustomERC20.sol
pragma solidity  >=0.5.0;

import "zos-lib/contracts/Initializable.sol";
import "openzeppelin-eth/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-eth/contracts/token/ERC20/ERC20Detailed.sol";

contract CustomERC20 is Initializable, ERC20, ERC20Detailed {
  function initialize(
    string memory name, string memory symbol, uint8 decimals, uint256 initialSupply, address initialHolder
  ) public initializer {
    require(initialSupply > 0);
    ERC20Detailed.initialize(name, symbol, decimals);
    _mint(initialHolder, initialSupply);
  }

  function transferMany(address[] memory tos, uint256 value) public {
    for (uint256 i = 0; i < tos.length; i++) {
      _transfer(msg.sender, tos[i], value);
    }
  }
}