import customersAPI from "../api/customerApi.js";
import validate from "../common/validate.js";
import Toast from "../common/toast.js";


let switchCtn = document.querySelector("#switch-cnt");
let switchC1 = document.querySelector("#switch-c1");
let switchC2 = document.querySelector("#switch-c2");
let switchCircle = document.querySelectorAll(".switch__circle");
let switchBtn = document.querySelectorAll(".switch-btn");
let aContainer = document.querySelector("#a-container");
let bContainer = document.querySelector("#b-container");
let allButtons = document.querySelectorAll(".submit");

let singUpBtn = document.querySelector(".sing-up-btn");

let getButtons = (e) => e.preventDefault();

let changeForm = (e) => {
    switchCtn.classList.add("is-gx");
    setTimeout(function () {
        switchCtn.classList.remove("is-gx");
    }, 1500);

    switchCtn.classList.toggle("is-txr");
    switchCircle[0].classList.toggle("is-txr");
    switchCircle[1].classList.toggle("is-txr");

    switchC1.classList.toggle("is-hidden");
    switchC2.classList.toggle("is-hidden");
    aContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-txl");
    bContainer.classList.toggle("is-z200");
};

let mainF = (e) => {
    for (var i = 0; i < allButtons.length; i++)
        allButtons[i].addEventListener("click", getButtons);
    for (var i = 0; i < switchBtn.length; i++)
        switchBtn[i].addEventListener("click", changeForm);
};

window.addEventListener("load", mainF);
const userNameEl = document.querySelector(".signIn-userName");
const passwordEl = document.querySelector(".signIn-password");
const signInBtn = document.querySelector(".signIn-btn");
let userNameValue = "";
let passwordValue = "";
userNameEl.addEventListener("change", () => {
    userNameValue = userNameEl.value;
});
passwordEl.addEventListener("change", () => {
    passwordValue = passwordEl.value;
});
const logIn = async (userName, password) => {
    if (!userName || !password) {
        Toast('Sai thông tin đăng nhập')
        return
    };
    try {
        const account = {
            username: userName,
            password: password,
        };
        const result = await customersAPI.login(account);
        
        if (result && result.length > 0) {

            localStorage.clear()
            localStorage.setItem("userInfo", JSON.stringify(result[0]));
            if(result[0].status === 0 ){
                Toast('Sai thông tin đăng nhập')
                localStorage.clear()
                return
            }
            if (result[0].idRole === 1) {
                window.location.href = "admin.html";
                return
            }
            window.location.href = "index.html";
            userNameEl.value = "";
            passwordEl.value = "";
        }else {
           
                Toast('Sai thông tin đăng nhập')
           
        }
    } catch (e) {
        console.log(e);
    }
};
signInBtn.addEventListener("click", () => {
    const errUsernameTextLg = document.querySelector(".err-username-lg");
    const errPasswordTextLg = document.querySelector(".err-password-lg");
    let errUsernameLg,errPasswordLg;
    if (!validate.notNull(userNameValue)) {
        errUsernameLg = true;
        errUsernameTextLg.classList.remove("d-none");
    }
    else{
        errUsernameLg = false;
        errUsernameTextLg.classList.add("d-none");
    }
    
    if (!validate.notNull(passwordValue)) {
        errPasswordLg = true;
        errPasswordTextLg.classList.remove("d-none");
    }
    else{
        errPasswordLg = false;
        errPasswordTextLg.classList.add("d-none");
    }
    if(errUsernameLg || errPasswordLg )
    {
        return;
    }
    else{
    logIn(userNameValue, passwordValue);
    }
});

// sing up

// console.log(nameR)
// console.log(userNameR)
// console.log(passwordR)
// console.log(addressR)
// console.log(phoneR)
//console.log(sexR)

let nameV =""
let userV =""
let passwordV =""
let addressV =""
let phoneV =""
let sexV   = 0

// nameR.onchange = () => {
//     nameR.value = nameV;
// }
// console.log(nameV)

const singUp = async (name,userName, password,email,address, phone,sex) => {
    try {
        const customer = {
            name:name,
            username: userName,
            password: password,
            email:email,
            addressCustomer:address,
            phone:phone,
            sex:sex,
            idRole : 2,
            status: 1
        };
        const result = await customersAPI.register(customer);
        if (result.status == true) {
            localStorage.clear()
            // alert("Đăng kí thành công mời bạn đăng nhập");
            Toast("Đăng kí thành công mời bạn đăng nhập", "success");
        }
        
    } catch (e) {
        console.log(e);
    }
};

const checkUser = async (userName) => {
    try {
        const result = await customersAPI.checkUser(userName);
        // if(result.length==1)
        // {
        //    return true
        // }
        // else{
        //     return false
        // }
        return result;
        
    } catch (e) {
        console.log(e);
    }
};
// console.log(checkUser("1vtb").then(data => {
//     console.log(data.length);
// }).catch(err => {
//     console.log(err);
// }))
singUpBtn.addEventListener("click", () => {
    const nameR = document.querySelector(".sing-up-name");
    const userNameR = document.querySelector(".sing-up-user-name");
    const passwordR = document.querySelector(".sing-up-password");
    const emailR = document.querySelector(".sing-up-email");
    const addressR = document.querySelector(".sing-up-address");
    const phoneR = document.querySelector(".sing-up-phone");
    const sexR = document.querySelector(".sing-up-sex:checked");
    const errNameText = document.querySelector(".err-name");
    const errUsernameText = document.querySelector(".err-username");
    const errPasswordText = document.querySelector(".err-password");
    const errEmailText = document.querySelector(".err-email");
    const errPhoneText = document.querySelector(".err-phone");
    const errAddressText = document.querySelector(".err-address");

    let errName,errUsername,errPassword,errEmail,errPhone,errAddress;
    if (!validate.name(nameR.value)) {
        errName = true;
        errNameText.classList.remove("d-none");
    }
    else{
        errName = false;
        errNameText.classList.add("d-none");
    }

    if (!validate.notNull(userNameR.value)) {
        errUsername = true;
        errUsernameText.classList.remove("d-none");
    }
    else{
        errUsername = false;
        errUsernameText.classList.add("d-none");
    }
    
    if (!validate.notNull(passwordR.value)) {
        errPassword = true;
        errPasswordText.classList.remove("d-none");
    }
    else{
        errPassword = false;
        errPasswordText.classList.add("d-none");
    }

    if (!validate.email(emailR.value)) {
        errEmail = true;
        errEmailText.classList.remove("d-none");
    }
    else{
        errEmail = false;
        errEmailText.classList.add("d-none");
    }

    if (!validate.phone(phoneR.value)) {
        errPhone = true;
        errPhoneText.classList.remove("d-none");
    }
    else{
        errPhone = false;
        errPhoneText.classList.add("d-none");
    }

    if (!validate.notNull(addressR.value)) {
        errAddress = true;
        errAddressText.classList.remove("d-none");
    }
    else{
        errAddress = false;
        errAddressText.classList.add("d-none");
    }

    // if (checkUser(userNameR).then  )
    // {
    //     console.log(userNameR)
    //     alert("Tên tài khoản đã tồn tại")
    //     return;
    // }
    

    if(errName || errEmail || errPhone || errUsername || errPassword || errAddress  )
    {
        return;
    }

    checkUser(userNameR.value).then (data => {
        console.log(data.length)
        if (data.length >0) {
            Toast("Tên tài khoản đã tồn tại")
            return;
        }
        else{
            singUp(nameR.value, userNameR.value,passwordR.value,emailR.value,addressR.value,phoneR.value,sexR.value);
            //window.location.replace("/login.html");
            nameR.value="";
            userNameR.value="";
            passwordR.value="";
            emailR.value="";
            addressR.value="";
            phoneR.value="";
            
        }
    })
    .catch(err => {
        console.log(err)
    })

});