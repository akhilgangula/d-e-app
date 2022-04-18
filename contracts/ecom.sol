pragma solidity ^0.5.4;

contract ecom {
    address payable public owner;
    uint256 public noOfProducts;
    constructor() public {
        owner = msg.sender;
        noOfProducts=0;
    }

    uint256 id;
    uint256 purchaseId;
    struct seller {
        string name;
        address addr;
        uint256 bankGuaraantee;
        bool bgPaid;
    }
    struct product {
        string productId;
        string productName;
        string Category;
        uint256 price;
        string description;
        address payable seller;
        bool isActive;
		address owner;
    }
    struct ordersPlaced {
        string productId;
        uint256 purchaseId;
        address orderedBy;
    }
    struct user {
        string name;
        string email;
        bool isCreated;
    }
    struct orders {
        string productId;
        uint256 purchaseId;
    }
    mapping(address => seller) public sellers;
    mapping(string => product) products;
    product[] public allProducts;

    mapping(address => user) public users;
    mapping(address => orders[]) userOrders;

    function sellerSignUp(string memory _name) public payable {
        require(!sellers[msg.sender].bgPaid, "You are Already Registered");
        require(msg.value == 5 ether, "Bank Guarantee of 5ETH Required");
        owner.transfer(msg.value);
        sellers[msg.sender].name = _name;
        sellers[msg.sender].addr = msg.sender;
        sellers[msg.sender].bankGuaraantee = msg.value;
        sellers[msg.sender].bgPaid = true;
    }

    function createAccount(
        string memory _name,
        string memory _email
    ) public {
        users[msg.sender].name = _name;
        users[msg.sender].email = _email;
        users[msg.sender].isCreated = true;
    }

    function buyProduct(string memory _productId) public payable {
        require(
            msg.value == products[_productId].price,
            "Value Must be Equal to Price of Product"
        );
        require(users[msg.sender].isCreated, "You Must Be Registered to Buy");

        products[_productId].seller.transfer(msg.value);

        purchaseId = id++;
        orders memory order = orders(
            _productId,
            purchaseId
        );
        userOrders[msg.sender].push(order);
        products[_productId].owner = msg.sender;
        products[_productId].isActive = false;
        
    }

    function addProduct(
        string memory _productId,
        string memory _productName,
        string memory _category,
        uint256 _price,
        string memory _description
    ) public {
        require(sellers[msg.sender].bgPaid, "You are not Registered as Seller");
        require(
            !products[_productId].isActive,
            "Product With this Id is already Active. Use other UniqueId"
        );

        product memory productInstace = product(
            _productId,
            _productName,
            _category,
            _price,
            _description,
            msg.sender,
            true,
			msg.sender
        );
        products[productInstace.productId].productId = productInstace.productId;
        products[productInstace.productId].productName = productInstace.productName;
        products[productInstace.productId].Category = productInstace.Category;
        products[productInstace.productId].description = productInstace.description;
        products[productInstace.productId].price = productInstace.price;
        products[productInstace.productId].seller = msg.sender;
        products[productInstace.productId].isActive = true;
		products[productInstace.productId].owner = msg.sender;
        allProducts.push(productInstace);
        noOfProducts++;
    }

    function myOrders(uint256 _index)
        public
        view
        returns(string memory, uint)
    {
        return (userOrders[msg.sender][_index].productId, userOrders[msg.sender][_index].purchaseId);
    }
}
