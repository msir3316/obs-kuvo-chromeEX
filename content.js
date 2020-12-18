function autoSet(){
    //オプション値取得
    chrome.storage.local.get(["autoReflect"],function(items){
        if(items.autoReflect){
            getMusicInfoDirectly();
        }
    });
};

function getMusicInfoDirectly(){
    let row = document.querySelector(".row.on");
    if(!row) row = document.querySelector(".row.off");
    if(!row){
        alert("Not Found");
        return;
    }
    let t = row.querySelector(".title").innerText;
    let a = row.querySelector(".artist").innerText;
    let musicInfo = {title: t, artist: a};
    setMusicInfo({title: t, artist: a});
};

window.addEventListener("load", autoSet);
