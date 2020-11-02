// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0.;

import "./ProductManager.sol";

/**
 * @dev Contract for hadnling payment for each individual product.  
 * Receives the payment and forwards it back to item manager.
 * By handling payments this way, we can use simple receive function and keep the information of which product is being purchased.
 * 
 */
contract ProductPaymentHanler{
    
    uint public price;
    uint public index;
    bool public isProductPurchased;
    ProductManager public parentContract;
    
    constructor(ProductManager _parentContract, uint _idex, uint _price) public {
        parentContract = _parentContract;
        index = _idex;
        price = _price;
    }
    
    /**
     * @dev Receiving payment for the product and redirecting payment to parent contract and triggering the event.
     */
    receive() external payable {
        require(!isProductPurchased, "Product is already paid.");
        require(msg.value == price, "You must pay the exact amout that product costs.");
        
        /// @dev Using low-level call function (instead of simple transfer function on contract)
        (bool success, ) = address(parentContract).call{value: msg.value}(abi.encodeWithSignature("triggerPayment(uint256)", index));
        require(success, "Transaction wan't successful.");
        
        isProductPurchased = true;
    }
}