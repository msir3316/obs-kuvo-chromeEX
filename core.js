//接続基本形
function connectOBS(){
    //オプション値取得
    chrome.storage.local.get(function(items){
        let address = items.address;
        let password = items.password;
        
        const obs = new OBSWebSocket();
        // OBSに接続してPromiseを受け取る
        obs.connect({
            address: address,
            password: password
          })
          // 接続成功
          .then(() => {

          })
            .catch(err => { // Promise convention dicates you have a catch on every chain.
            alert("OBSとの接続に失敗しました");
            console.log(err);
        });
    });
};

function isWindowsOrMac(){
    let ua = window.navigator.userAgent.toLowerCase();
    if(ua.indexOf("windows nt") !== -1) {
        return "win";
    } else if(ua.indexOf("mac os x") !== -1) {
        return "mac";
    }
    
};

function getLengthForZenkaku(str){
    let result = 0;
      for(let i=0;i<str.length;i++){
        let chr = str.charCodeAt(i);
        if((chr >= 0x00 && chr < 0x81) ||
           (chr === 0xf8f0) ||
           (chr >= 0xff61 && chr < 0xffa0) ||
           (chr >= 0xf8f1 && chr < 0xf8f4)){
          //半角文字の場合は0.5を加算
          result += 0.5;
        }else{
          //それ以外の文字の場合は1を加算
          result += 1;
        }
      }
      //結果を返す
      return result;
};

//KUVOのページを見る
function getMusicInfo(){
    //メッセージのやりとりがわからなかったので代わりにかなりごり押しな実装
    let query = 'let row = document.querySelector(".row.on");'+
                'if(!row){ rowoff = document.querySelectorAll(".row.off");row = rowoff.item(rowoff.length-1);}'+
                'let t = row.querySelector(".title").innerText;'+
                'let a = row.querySelector(".artist").innerText;'+
                '({title: t, artist: a})';
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.executeScript(
              tabs[0].id,
              {code: query},
                function (result) {
              if(!result[0]){
                  alert("Not Found");
                  return;
              }
                  setMusicInfo(result[0]);
                });
        });
};

//OBSでテキストをセットする
function setMusicInfo(musicInfo){
    if(musicInfo["title"]=="") musicInfo["title"] = " ";
    if(musicInfo["artist"]=="") musicInfo["artist"] = " ";
    //オプション値取得
    chrome.storage.local.get(function(items){
        let address = items.address;
        let password = items.password;
        let titleLimitLength = Number(items.titleLimitLength);
        let artistLimitLength = Number(items.artistLimitLength);
        let titleWidth = Number(items.titleWidth);
        let artistWidth = Number(items.artistWidth);
        let scrollSpeed = Number(items.scrollSpeed);

        let isScrollTitle = {'cx': titleWidth, 'limit_cx': true, 'limit_cy': false, 'speed_x': scrollSpeed};
        let notScrollTitle = {'cx': titleWidth, 'limit_cx': false, 'limit_cy': false, 'speed_x': 0.0};
        
        let isScrollArtist = {'cx': artistWidth, 'limit_cx': true, 'limit_cy': false, 'speed_x': scrollSpeed};
        let notScrollArtist = {'cx': artistWidth, 'limit_cx': false, 'limit_cy': false, 'speed_x': 0.0};

        const obs = new OBSWebSocket();
        // OBSに接続してPromiseを受け取る
        obs.connect({
            address: address,
            password: password
          })
          // 接続成功
          .then(() => {
              //文字数に対するスクロール等の対応
              if(getLengthForZenkaku(musicInfo["title"]) > titleLimitLength){
                  musicInfo["title"] += "   ";
                  obs.send("SetSourceFilterSettings", {"sourceName":"title", "filterName": "scroll", "filterSettings": isScrollTitle});
              }else{
                  obs.send("SetSourceFilterSettings", {"sourceName":"title", "filterName": "scroll", "filterSettings": notScrollTitle});
              }
              
              if(getLengthForZenkaku(musicInfo["artist"]) > artistLimitLength){
                  musicInfo["artist"] += "   ";
                  obs.send("SetSourceFilterSettings", {"sourceName":"artist", "filterName": "scroll", "filterSettings": isScrollArtist});
              }else{
                  obs.send("SetSourceFilterSettings", {"sourceName":"artist", "filterName": "scroll", "filterSettings": notScrollArtist});
              }
              
              
              //OSを判断して対応するメッセージを送る
              let os = isWindowsOrMac();
              if(os == "win"){
                  obs.send("SetTextGDIPlusProperties",{"source":"title","text":musicInfo["title"]});
                  obs.send("SetTextGDIPlusProperties",{"source":"artist","text":musicInfo["artist"]});
              }
              if(os == "mac"){
                  obs.send("SetTextFreetype2Properties",{"source":"title","text":musicInfo["title"]});
                  obs.send("SetTextFreetype2Properties",{"source":"artist","text":musicInfo["artist"]});
              }
              obs.disconnect();
          })
            .catch(err => { // Promise convention dicates you have a catch on every chain.
                alert("OBSとの接続に失敗しました");
            console.log(err);
        });
    });
};

function resetText(){
    let text = {title: "TITLE", artist: "ARTIST"};
    setMusicInfo(text);
};
