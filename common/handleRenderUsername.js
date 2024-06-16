const logIn_link = document.querySelector(".log-in");
const logOut = document.querySelector(".log-out");
const register = document.querySelector(".register");
const userName = document.querySelector(".user-name");
const changeInfo = document.querySelector(".change-info");
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const purchaseOrder = document.querySelector(".purchase-order");

if (userInfo) {
    if(logIn_link && register){
        logIn_link.style.display = "none";
        register.style.display = "none";
    }
    userName.innerHTML = userInfo.username;
} else {
    if(logOut && changeInfo && purchaseOrder){
        logOut.style.display = "none";
        changeInfo.style.display = "none";
        purchaseOrder.style.display = "none";
    }
   
}
console.log(logOut)
logOut.addEventListener("click", () => {
    console.log(123)
    localStorage.clear();
    window.location.href = "index.html";
});
