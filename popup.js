function setFreeText(){
    let t = document.getElementById("free-title").value;
    let a = document.getElementById("free-artist").value;
    setMusicInfo( ({title: t, artist: a}));
    
}

document.getElementById("setText").addEventListener("click", getMusicInfo);
document.getElementById("reset").addEventListener("click", resetText);
document.getElementById("free-text").addEventListener("click", setFreeText);
