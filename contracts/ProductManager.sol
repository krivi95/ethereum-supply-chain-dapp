// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0.;

import "../client/node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./ProductPaymentHanler.sol";

/**
 * @dev Contract for managing creation of new products and handling of the events.   
 */
contract ProductManager is Ownable{
    
    /// @dev Product states
    enum ProductState{Created, Paid, Delivered}
    
    /// @dev Info we store for every product
    struct Product{
        string productUid;
        uint price;
        ProductState state;
        ProductPaymentHanler paymentHandler;
    }
    
    /// @dev Keeping track of products and their states.
    mapping(uint => Product) public products;
    uint public index;
    
    /// @dev For emiting events whenever product state has been changed.
    event ProductStateChanged(uint _productIndex, uint _step, address productPaymentAddress);
    
    /**
     * @dev Creating new product and saving it in storage.
     */
    function createProduct(string memory _id, uint _price) public onlyOwner {
        ProductPaymentHanler paymentHandler = new ProductPaymentHanler(this, index, _price);
        products[index].paymentHandler = paymentHandler;
        products[index].productUid = _id;
        products[index].price = _price;
        products[index].state = ProductState.Created;
        
        emit ProductStateChanged(index, uint(products[index].state), address(products[index].paymentHandler));
        index++;
    }
    
    /**
     * @dev Purchasing the product and emitting an event about it.
     */
    function triggerPayment(uint _productIndex) public payable{
        require(products[_productIndex].price <= msg.value, "Can't purchase the product, not enough money.");
        require(products[_productIndex].state == ProductState.Created, "Can't purchase the product, product is already purchased or sent for delivery");
        
        products[_productIndex].state = ProductState.Paid;
        emit ProductStateChanged(_productIndex, uint(products[_productIndex].state), address(products[_productIndex].paymentHandler));
    }
    
    /**
     * @dev Shipping the product and emitting an event about it.
     */
    function triggerDelivery(uint _productIndex) public onlyOwner {
        require(products[_productIndex].state == ProductState.Paid, "Product must be paid first, to be sent for delivery");
    
        products[_productIndex].state = ProductState.Delivered;
        emit ProductStateChanged(_productIndex, uint(products[_productIndex].state), address(products[_productIndex].paymentHandler));
    }
    
    /**
     * @dev Withdrawing money (deposits for products' purchases) from this contract.
     */
    function withdraw() public onlyOwner{
        msg.sender.transfer(address(this).balance);
    }
    
    /**
     * @dev Overriding renounceOwnership function from Wnable contract.
     */
    function renounceOwnership() public override onlyOwner {
        revert("You're not able to renounce ownership");
    }
}