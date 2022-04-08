let cdProductArray = [];

let cdObject = function (pStoreID, pSalesPersonID, pCdID, pPricePaid, pDate) {
    this.storeID = pStoreID;
    this.salesPersonID = pSalesPersonID;
    this.cdID = pCdID;
    this.pricePaid = pPricePaid;
    this.date = pDate;
}

function generateRandomProduct() {
let storeID;
let salesPersonID;
let cdID;
let pricePaid;
let date;

    //for storeID
let cdIdrandom = Math.floor(Math.random() * 10);
let pricePaidrandom = Math.floor(Math.random() * 11) + 5;

let storeIDArray = [98053 , 98007, 98077, 98055, 98011, 98046]
let cdIdArray = [123456, 123654, 321456, 321654, 654123,
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

let cdProduct = new cdObject(storeID, salesPersonID, cdID, pricePaid, date);

  return cdProduct;
}



document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("button1").addEventListener("click", function () {
        let randomProduct = generateRandomProduct();

        document.getElementById("storeID").innerHTML = randomProduct.storeID;
        document.getElementById("salesPersonID").innerHTML = randomProduct.salesPersonID;
        document.getElementById("cdID").innerHTML = randomProduct.cdID;
        document.getElementById("pricePaidID").innerHTML = randomProduct.pricePaid;
        document.getElementById("date").innerHTML = randomProduct.date;
    });   

});

