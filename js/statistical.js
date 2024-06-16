import billApi from "../api/billApi.js";
import productsAPI from "../api/productApi.js";
import Toast from "../common/toast.js";



const dateBefore = document.querySelector(".dateBefore");
const dateAfter = document.querySelector(".dateAfter");

const productQuantity = document.querySelector(".product-quantity");
const productPrice = document.querySelector(".product-price");
const submitBtn = document.querySelector(".statistical-btn");
// container
const importList = document.querySelector(".import-list");
const productList = document.querySelector(".product-list");

// set default input date

// function fommatDate( date){
//     let day = parseInt(date.slice(8,10)) + 1
//     let month = parseInt(date.slice(5,8))
//     let year = parseInt(date.slice(0,5))
//     let result = day + '-' + month + '-' + year
//     return result;
// }

// fommatDate('2022-02-08')

function setInputDate(_id){
    var _dat = document.querySelector(_id);
    var hoy = new Date(),
        d = hoy.getDate(),
        m = hoy.getMonth()+1, 
        y = hoy.getFullYear(),
        data;

    if(d < 10){
        d = "0"+d;
    };
    if(m < 10){
        m = "0"+m;
    };

    data = y+"-"+m+"-"+d;
    console.log(data);
    _dat.value = data;
};

setInputDate("#dateDefault");
setInputDate("#dateDefault1");

const handleStatistical = async () => {
    try {
    // const date ={
    //     dateBefore: dateBefore.value,
    //     dateAfter: dateAfter.value
    // }
    // console.log(date);
    // import filter
   
    // render import list 

    const resultName = await productsAPI.getAllProduct();
    console.log(resultName);


 

    // console.log(importQuantityValue);

    // bill filter
    const resultBill = await billApi.getAllBill();
    let filterBill =  resultBill.filter( item =>{
        return (item.dateBill >= dateBefore.value && item.dateBill <= dateAfter.value)
    })

    // console.log(filterBill)

    let resultBillDetailList = [];

    const resultBillDetail = await billApi.getAllBillDetail();
    // console.log(resultBillDetail)


    filterBill.forEach( item => {
        resultBillDetail.forEach( item1 => {
            if (item.idBill == item1.idBill){
                resultBillDetailList.push(item1)
            }
        })
        
    // resultBillDetail.push(result);
    })
    // console.log(resultBillDetailList)
    // render product list 
    const productListR = resultBillDetailList.map( (item, index) => {
        let name;  

        resultName.forEach((item1) =>{
            if(item1.idProduct == item.idProduct)
            {
                name = item1.title
            }
        })

        return `<tr>
        <th>${index+1}</th>
        <td>${name}</td>
        <td>${item.quantity}</td>
        <td class="color-primary">$${item.price}</td>
    </tr>`
    })

    productList.innerHTML = productListR.join("")


    let productQuantityValue = resultBillDetailList.reduce( (accumulator, currentValue) => {
        return accumulator + currentValue.quantity
    } , 0)

    let productPriceValue = resultBillDetailList.reduce( (accumulator, currentValue) => {
        return accumulator + (currentValue.quantity * currentValue.price)
    } , 0)

    console.log(productQuantityValue)
    console.log(productPriceValue)
    // set UI

    productQuantity.innerHTML = productQuantityValue
    productPrice.innerHTML = "$" + productPriceValue
    
    }
     catch (error) {
        console.log(error);
    }
}


submitBtn.onclick = () => {
    if (dateBefore.value > dateAfter.value) {
        Toast("Từ ngày phải trước đến ngày")
        setInputDate("#dateDefault");
        setInputDate("#dateDefault1");
    }
    else{
        Toast("Thống kê thành công", "success")
        handleStatistical()

    }
}

