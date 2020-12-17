function save_options(){
    let address = document.getElementById("address").value;
    let password = document.getElementById("password").value;
    
    let titleLimitLength = document.getElementById("titleLimitLength").value;
    let artistLimitLength = document.getElementById("artistLimitLength").value;
    
    let titleWidth = document.getElementById("titleWidth").value;
    let artistWidth = document.getElementById("artistWidth").value;
    
    let scrollSpeed = document.getElementById("scrollSpeed").value;
    
    chrome.storage.local.set({
        address: address,
        password: password,
        titleLimitLength: titleLimitLength,
        artistLimitLength: artistLimitLength,
        titleWidth: titleWidth,
        artistWidth: artistWidth,
        scrollSpeed: scrollSpeed
    }, function(){
        var status = document.getElementById('status');
            status.textContent = "Options saved.";
            setTimeout(function() {
              status.textContent = "";
            }, 750);
    });
};

function set_options(){
    //default value
    chrome.storage.local.get({
    address: "localhost:4444",
    password: "hogehoge",
    titleLimitLength: 40,
    artistLimitLength: 40,
    titleWidth: 1980,
    artistWidth: 1980,
    scrollSpeed: 25.0
    }, function(items){
        //値が保存されていたら
        document.getElementById("address").value = items.address;
        document.getElementById("password").value = items.password;
        document.getElementById("titleLimitLength").value = items.titleLimitLength;
        document.getElementById("artistLimitLength").value = items.artistLimitLength;
        document.getElementById("titleWidth").value = items.titleWidth;
        document.getElementById("artistWidth").value = items.artistWidth;
        document.getElementById("scrollSpeed").value = items.scrollSpeed;
    })
};

// set events
document.addEventListener("DOMContentLoaded", set_options);
document.getElementById("save").addEventListener("click", save_options);
