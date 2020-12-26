# obs-kuvo-chromeEX

obs-websocketを使って、KUVO経由でrekordboxで流している曲の情報を表示するやつをChrome拡張用に作りました

<img src="./assets/example.png" width="800px" alt="使用例" />

## 動作確認済み
- Mac OS X Catalina, OBS Studio (Mac版) 26.0.2
- Windows 10, OBS Studio (Windows版) 26.0.2

# 目次
1. [OBSの準備](#obs_setting)
1. [本体の準備](#setting)
1. [使い方](#how2use)
1. [その他](#others)
1. [確認済み不具合](#problems)
1. [連絡先](#contact)
1. [姉妹作](#sister_works)

<a id="obs_setting"></a>
# OBSの準備
1. OBSに [obs-websocket](https://github.com/Palakis/obs-websocket/) をインストール
1. OBS起動
1. OBSメニューから「ツール -> Websocket Server Settings」でパスワード等を設定
1. 「title」「artist」のテキストソースを作る
    - 「title」「artist」はそれぞれ曲名とアーティスト名の表示欄になる
1. 「title」「artist」に「scroll」という名前でスクロールのフィルターを作る

<a id="setting"></a>
# 本体の準備
1. これをgit clone
1. [obs-websocket-js](https://github.com/haganbmj/obs-websocket-js)を導入、中のobs-websocket.jsをこれに入れる
1. Chrome拡張の画面を開く
1. 「パッケージ化されていない拡張機能を読み込む」でこれをフォルダごと指定
1. オプションで各種設定
    - 「スクロールの幅」はスクロールフィルタで「幅を制限する」にチェックを入れたときに出てくる「幅」の設定。フォントサイズやソース自体のサイズ、配置や用途によって適切な値は異なるので各自で事前に調整してください。

<a id="how2use"></a>
# 使い方
1. OBSを起動、Websocketサーバを有効にする
1. rekordboxにて、KUVOのLive PlaylistをSTARTし、何か曲を流す
1. https://kuvo.com/mykuvo/djmix/playlist に新しいプレイリストができるので開く
1. そのページで拡張のポップアップを開く。目印はこのアイコン<img src="./icon/icon_32.png" width=16px alt="アイコン" />
1. 「更新する」ボタンを押す
1. OBSの「title」「artist」の内容が変わる
1. 次に曲を流すたびに、ページをリロードすると良いでしょう

<a id="others"></a>
# その他
- オプションで「プレイリストリロード時に自動でOBSに反映」にチェックを入れると、プレイリストページをリロードするだけで反映されます。
    - プレイリストページにアクセスしただけでは動作しません。アクセスした上でページをリロードしてください。
- オプションで「ページ内容の変化を検知して完全自動で反映」にチェックを入れると、流した次の曲がページに表示されるだけで反映されます。
    - ただし、KUVOのプレイリストページの反映速度はかなりムラがあるため、OBSに即反映は期待しないでください。

<a id="problems"></a>
# 確認済み不具合
- 「更新する」を連続して使用できない（Not Foundアラートが出る）。
    - 一度ページのリロードを挟むと再使用可能。
- Windows版にて、テキストの反映が上手くいかない場合がある。
    - 「更新する」でartistのテキストが反映されない場合があることを確認。改めて更新を行うことで正常に動作はする。

<a id="contact"></a>
# 連絡先
[Twitter](https://twitter.com/msir3316)

<a id="sister_works"></a>
# 姉妹作
[obs-kuvo(suzu2464氏制作)](https://github.com/suzu2469/obs-kuvo)
