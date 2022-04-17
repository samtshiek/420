
const cdObject = function (pStoreID, pSalesPersonID, pCdID, pPricePaid, pDate) {
    this.storeID = pStoreID;
    this.salesPersonID = pSalesPersonID;
    this.cdID = pCdID;
    this.pricePaid = pPricePaid;
    this.date = pDate;
}

// random values to be stored
function generateRandomProduct(date) {
    let storeID;
    let salesPersonID;
    let cdID;
    let pricePaid;

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

    const cdProduct = new cdObject(storeID, salesPersonID, cdID, pricePaid, date);
    
    return cdProduct;
}

// date + 5 to 30 minutes requirement 
function Sum(currentDate) {
    const randomTime = Math.floor(Math.random() * 5) + 26; // 26 because 0 counts
    const newDate = currentDate + randomTime;

    return newDate;
}

// generate many (500) random product function
function generateManyRandomProduct(num) {
    const arr = [];
    let date = Date.now();

    for (let i = 0; i < num; i++) {
        arr.push(generateRandomProduct(date));
        date = Sum(date);
    }

    return arr;
}

document.addEventListener("DOMContentLoaded", function (event) {
    // when button1 is clicked
    document.getElementById("button1").addEventListener("click", function () {
        let date = Date.now();
        const randomProduct = generateRandomProduct(date);

        document.getElementById("storeID").innerHTML = randomProduct.storeID;
        document.getElementById("salesPersonID").innerHTML = randomProduct.salesPersonID;
        document.getElementById("cdID").innerHTML = randomProduct.cdID;
        document.getElementById("pricePaidID").innerHTML = randomProduct.pricePaid;
        document.getElementById("date").innerHTML = randomProduct.date;
    });   

    // when button2 is clicked
    document.getElementById("button2").addEventListener("click", function () {
        let date = Date.now();
        const orderObject = generateRandomProduct(date);

        fetch('/SubmitOne', {
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

        fetch('/Submit500', {
            method: "POST",
            body: JSON.stringify(orderObject),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response=>response.json())
        .then(json=>console.log(json))
        .catch(err=>console.log(err));
    }); 
    
    document.getElementById("button4").addEventListener("click", function () {

    });

    function createQuery2List(responseData) {
        let ol = document.getElementById("query2List");

        while(ol.firstChild) {
            ol.removeChild(ol.firstChild);
        }

        responseData.forEach(element => {
            let li = document.createElement('li');
        li.innerHTML = "cdID:   " + element._id + "   sum:   " + element.count;
            ol.appendChild(li);
        });
    }

    document.getElementById("button5").addEventListener("click", function () {

        fetch('/FilterData2')
        .then(response => response.json())
        .then(responseData => createQuery2List(responseData))
        .catch(err => console.log("request not successful error: ", err));

    });
});