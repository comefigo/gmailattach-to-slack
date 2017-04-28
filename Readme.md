# Gmailに送られてくるAWSの請求書をSlackに共有

毎月送られてくるAWSの請求書をSlackに転送する

## 方法

1. [Token](https://api.slack.com/custom-integrations/legacy-tokens)の取得
2. 通知させたいGoogleユーザでログイン
3. 新規[Google App Script](https://www.google.com/script/start/)を作成
4. プロジェクト名は任意の名前を入力
5. コードには、Main.gsの内容を張り付け
6. 以下の箇所を修正してください

    ```
    var apiToken = '<token>';       // https://api.slack.com/custom-integrations/legacy-tokensでtokenを発行してください
    var postChannel = "<channel>";  // 通知したいチャンネル名
    ```

7. [スケジュール実行の設定](http://pineplanter.moo.jp/non-it-salaryman/2016/05/20/google-apps-script-minute-timer/)  
    毎月３～４日に送られてくるので、5日あたりに自動実行を設定しとくと安全でしょう


## リファレンス

- [Gmail検索用演算子](https://support.google.com/mail/answer/7190?hl=ja)
- [Gmail Api](https://developers.google.com/apps-script/reference/gmail/gmail-app)
- [Slack Api File upload](https://api.slack.com/methods/files.upload)