pragma solidity  >=0.5.0;

import "zos-lib/contracts/Initializable.sol";
import  "./erc-1155/contracts/ERC1155MixedFungibleMintable.sol";

contract CustomERC1155 is Initializable {
    
    ERC1155MixedFungibleMintable public token;
    bool private initialized;

    function initialize(ERC1155MixedFungibleMintable _token) initializer public {
        require(!initialized);
        initialized = true;
        token = _token;
    }

    function createToken( string memory _uri, bool _isNF) public returns (uint256 _type) {
        return token.create(_uri, _isNF);
    }
}