chrome.runtime.onInstalled.addListener(function() {
    //KUVOのプレイリストページだけ実行可能にする
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {urlMatches: 'kuvo.com/playlist/.*'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
});
