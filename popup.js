function setFreeText(){
    let t = document.getElementById("free-title").value;
    let a = document.getElementById("free-artist").value;
    chrome.storage.local.get(["serverOS"],function(items){
        setMusicInfo( ({title: t, artist: a}), items.serverOS);
    });
    
}

document.getElementById("setText").addEventListener("click", getMusicInfo);
document.getElementById("reset").addEventListener("click", resetText);
document.getElementById("free-text").addEventListener("click", setFreeText);
