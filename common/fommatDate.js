function fommatDate( date){
    let day = parseInt(date.slice(8,10)) + 1
    let month = parseInt(date.slice(5,8))
    let year = parseInt(date.slice(0,5))
    let result = day + '-' + month + '-' + year
    return result;
}

export default fommatDate;