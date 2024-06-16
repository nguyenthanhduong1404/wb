import customersAPI from "../api/customerApi.js";
import validate from "../common/validate.js";
import Toast from "../common/toast.js";


let infoUserString = localStorage.getItem("userInfo");

let infoUser = JSON.parse(infoUserString);

let idUser = infoUser.idUser;

let userNameV = infoUser.username;

let userPassword = infoUser.password;

const changeBtn = document.querySelector(".change");

const changePasswordBtn = document.querySelector(".change-password");



console.log(changeBtn);

console.log(idUser);
//load
let switchCtn = document.querySelector("#switch-cnt");
let switchC1 = document.querySelector("#switch-c1");
let switchC2 = document.querySelector("#switch-c2");
let switchCircle = document.querySelectorAll(".switch__circle");
let switchBtn = document.querySelectorAll(".switch-btn");
let aContainer = document.querySelector("#a-container");
let bContainer = document.querySelector("#b-container");
let allButtons = document.querySelectorAll(".submit");

let getButtons = (e) => e.preventDefault()

let changeForm = (e) => {

    switchCtn.classList.add("is-gx");
    setTimeout(function(){
        switchCtn.classList.remove("is-gx");
    }, 1500)

    switchCtn.classList.toggle("is-txr");
    switchCircle[0].classList.toggle("is-txr");
    switchCircle[1].classList.toggle("is-txr");

    switchC1.classList.toggle("is-hidden");
    switchC2.classList.toggle("is-hidden");
    aContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-z200");
}

let mainF = (e) => {
    for (var i = 0; i < allButtons.length; i++)
        allButtons[i].addEventListener("click", getButtons );
    for (var i = 0; i < switchBtn.length; i++)
        switchBtn[i].addEventListener("click", changeForm)
}

window.addEventListener("load", mainF);

//
const nameR = document.querySelector(".sing-up-name");
const emailR = document.querySelector(".sing-up-email");
const addressR = document.querySelector(".sing-up-address");
const phoneR = document.querySelector(".sing-up-phone");
const sexR = document.querySelector(".sing-up-sex");

const getCustomer = async () => {
    try {
        const result = await customersAPI.getCustomerById(idUser);
        console.log(result);
        nameR.value = result[0].name;
        emailR.value = result[0].email;
        addressR.value = result[0].addressCustomer;
        phoneR.value = result[0].phone;
        sexR.value = result[0].sex;

    } catch (error) {
        console.log(error);
    }
};

getCustomer();

const change = async (userName,address, email, phone,sex,name) => {
    try {
        const customer = {
            idRole:2,
            username: userName,
            addressCustomer:address,
            email:email,
            phone:phone,
            sex:sex,
            name:name
        };
        const result = await customersAPI.change(customer,idUser);
        console.log(result.status);
        if (result.status == true) {
            Toast("Sửa thông tin thành công", "success");
            
        }
        
    } catch (e) {
        console.log(e);
    }
};

changeBtn.addEventListener("click", () => {
    const nameV = nameR.value;
    const emailV = emailR.value;
    const addressV = addressR.value;
    const phoneV = phoneR.value;
    const sexV = sexR.value;
    const errNameText = document.querySelector(".err-name");
    const errEmailText = document.querySelector(".err-email");
    const errPhoneText = document.querySelector(".err-phone");
    const errAddressText = document.querySelector(".err-address");

    let errName,errEmail,errPhone,errAddress;
    if (!validate.name(nameV)) {
        errName = true;
        errNameText.classList.remove("d-none");
    }
    else{
        errName = false;
        errNameText.classList.add("d-none");
    }

    if (!validate.email(emailV)) {
        errEmail = true;
        errEmailText.classList.remove("d-none");
    }
    else{
        errEmail = false;
        errEmailText.classList.add("d-none");
    }

    if (!validate.phone(phoneV)) {
        errPhone = true;
        errPhoneText.classList.remove("d-none");
    }
    else{
        errPhone = false;
        errPhoneText.classList.add("d-none");
    }

    if (!validate.notNull(addressV)) {
        errAddress = true;
        errAddressText.classList.remove("d-none");
    }
    else{
        errAddress = false;
        errAddressText.classList.add("d-none");
    }

    if(errName || errEmail || errPhone || errAddress  )
    {
        return;
    }
    else{
        change( userNameV,addressV,emailV,phoneV,sexV,nameV);
        
        //window.location.replace("change-user.html");
        
    }
});

// change password

const changePassword = async (userName,password) => {
    try {
        const account = {
            username: userName,
            password:password
        };
        const result = await customersAPI.changePassword(account);
    } catch (e) {
        console.log(e);
    }
};

changePasswordBtn.addEventListener("click", () =>{
    let oldPassword = document.querySelector(".old-password").value;
    let newPassword = document.querySelector(".new-password").value;
    let checkNewPassword = document.querySelector(".check-new-password").value;
    const errOldPasswordText = document.querySelector(".err-old-password");
    const errNewPasswordText = document.querySelector(".err-new-password");
    const errCheckPasswordText = document.querySelector(".err-check-password");
    let errOldPassword,errNewPassword,errCheckPassword;

    if (!validate.notNull(oldPassword)) {
        errOldPassword = true;
        errOldPasswordText.classList.remove("d-none");
    }
    else{
        errOldPassword = false;
        errOldPasswordText.classList.add("d-none");
    }

    if (!validate.notNull(newPassword)) {
        errNewPassword = true;
        errNewPasswordText.classList.remove("d-none");
    }
    else{
        errNewPassword = false;
        errNewPasswordText.classList.add("d-none");
    }

    if (!validate.notNull(checkNewPassword)) {
        errCheckPassword = true;
        errCheckPasswordText.classList.remove("d-none");
    }
    else{
        errCheckPassword = false;
        errCheckPasswordText.classList.add("d-none");
    }
    console.log(userPassword)
    if(oldPassword != userPassword){
        Toast("Bạn nhập sai password cũ");
        return
    }

    if(newPassword != checkNewPassword)
    {
        Toast("Mật khẩu mới và mật khẩu xác thực phải giống nhau");

        return
    }

    if(errOldPassword || errNewPassword || errCheckPassword  )
    {
        return;
    }
    else{
        console.log(userNameV)
        console.log(newPassword)

        changePassword(userNameV,newPassword)
        window.location.replace("/change-user.html");
        Toast("Đổi mật khẩu thành công", "success");
    }


})