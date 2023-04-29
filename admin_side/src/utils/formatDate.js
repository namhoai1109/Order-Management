export const formatDate = (d) => {
    let date = new Date(d);
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    let seconds = ("0" + date.getSeconds()).slice(-2);

    let formattedDate = year + "/" + month + "/" + day + " " + hours + ":" + minutes + ":" + seconds;

    if (formattedDate === "1970/01/01 08:00:00") {
        formattedDate = "null";
    }else if(formattedDate === "NaN/aN/aN aN:aN:aN"){
        formattedDate = "";
    }
    return formattedDate;
}


