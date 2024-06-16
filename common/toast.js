const Toast = (message, className) => {
    let  background = '#2dd284';
    if(!className){
        background = '#FF0000'
    }
    Toastify({
        text: message,
        className: className,
        duration: 1000,
        style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: background,
            height: "75px",
            width: "300px",
            borderRadius: "5px",
        },
        offset: {
            x: "38em",
            y: 10,
        },
    }).showToast();
};

export default Toast;
