
// var options = {
//     type: "basic",
//     title: "Reminder",
//     message: "You have task to do",
//     iconUrl: "logo192.png"
// };
    
// chrome.notifications.create(options, callback);

// function callback(){
// }

var tm = Date.now();


setTimeout(function(){
    var options = {
        type: "basic",
        title: "Reminder",
        message: "You have task to do",
        iconUrl: "noti.png"
    };
       
    chrome.notifications.create(options, callback);

    function callback(){}
    }, 3000);