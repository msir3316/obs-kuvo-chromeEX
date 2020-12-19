function autoSet(){
    //オプション値取得
    chrome.storage.local.get(["autoReflect"],function(items){
        if(items.autoReflect){
            getMusicInfoDirectly();
        }
    });
};

function observeMutation(){
    //DOMの変化を監視して完全自動で反映させる
    const target = document.querySelector('.tracklist-area');
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            getMusicInfoDirectly();
        });
    });
    const config = {
        childList: true,
        subtree: true
    };
    observer.observe(target, config);
}

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

chrome.storage.local.get(["observePage"],function(items){
    if(items.observePage){
        observeMutation();
    }
});
