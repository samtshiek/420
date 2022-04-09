const cdObject = function (pStoreID, pSalesPersonID, pCdID, pPricePaid, pDate) {
    this.storeID = pStoreID;
    this.salesPersonID = pSalesPersonID;
    this.cdID = pCdID;
    this.pricePaid = pPricePaid;
    this.date = pDate;
}

// random values to be stored
function generateRandomProduct() {
    let storeID;
    let salesPersonID;
    let cdID;
    let pricePaid;
    let date;

    // necessary to storeID
    const cdIdrandom = Math.floor(Math.random() * 10);
    const pricePaidrandom = Math.floor(Math.random() * 11) + 5;

    // respective ranges for each random values
    const storeIDArray = [98053 , 98007, 98077, 98055, 98011, 98046]
    const cdIdArray = [123456, 123654, 321456, 321654, 654123,
        654321, 543216, 354126, 621453, 623451]

    storeID = storeIDArray[(Math.floor(Math.random() * 6) + 1) - 1]

    switch(storeID) {
        case 98053:
            salesPersonID = Math.floor(Math.random() * 4) + 1;
            break;
        case 98007:
            salesPersonID = Math.floor(Math.random() * 4) + 5;
            break;
        case 98077:
            salesPersonID = Math.floor(Math.random() * 4) + 9;
            break;
        case 98055:
            salesPersonID = Math.floor(Math.random() * 4) + 13;
            break;
        case 98011:
            salesPersonID = Math.floor(Math.random() * 4) + 17;
            break;
        case 98046:
            salesPersonID = Math.floor(Math.random() * 4) + 21;
            break;
    }

    cdID = cdIdArray[cdIdrandom];
    pricePaid = pricePaidrandom;
    date = Date.now();

    const cdProduct = new cdObject(storeID, salesPersonID, cdID, pricePaid, date);
    
    return cdProduct;
}

// date + 5 to 30 minutes requeriment 
function Sum(currentDate) {
    const randomTime = 5 + Math.floor(Math.random() * 26); // 26 because 0 counts
    const newDate = new Date();

    newDate.setMinutes(currentDate.getMinutes() + randomTime);
    return newDate;
}

// generate many (500) random product function
function generateManyRandomProduct(num) {
    const arr = [];
    let date = new Date();

    for (let i = 0; i < num; i++) {
        arr.push(generateRandomProduct(date));
        date = Sum(date);
    }

    return arr;
}

document.addEventListener("DOMContentLoaded", function (event) {
    // when button1 is clicked
    document.getElementById("button1").addEventListener("click", function () {
        const randomProduct = generateRandomProduct();

        document.getElementById("storeID").innerHTML = randomProduct.storeID;
        document.getElementById("salesPersonID").innerHTML = randomProduct.salesPersonID;
        document.getElementById("cdID").innerHTML = randomProduct.cdID;
        document.getElementById("pricePaidID").innerHTML = randomProduct.pricePaid;
        document.getElementById("date").innerHTML = randomProduct.date;
    });   

    // when button2 is clicked
    document.getElementById("button2").addEventListener("click", function () {
        const orderObject = generateRandomProduct();

        fetch('/order', {
            method: "POST",
            body: JSON.stringify(orderObject),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response=>response.json())
        .then(json=>console.log(json))
        .catch(err=>console.log(err));
    });   

    // when button3 is clicked
    document.getElementById("button3").addEventListener("click", function () {
        const orderObject = generateManyRandomProduct(500);

        fetch('/order', {
            method: "POST",
            body: JSON.stringify(orderObject),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response=>response.json())
        .then(json=>console.log(json))
        .catch(err=>console.log(err));
    });   
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(`${__dirname}/../public/index.html`));
  });
  
  router.post('/Create', function(req, res) {
    let order = CreateRandomOrder(new Date());
    console.log(order);
  
  });
  
  router.post('/SubmitOne', function(req, res) {
    console.log(req.body);
  });
  
  router.post('/Submit500', function(req, res) {
    let data = JSON.stringify(req.body);
    fs.writeFileSync('entries.json', data);
  });
  
  module.exports = router;
