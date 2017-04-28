var apiToken = '<token>';       // https://api.slack.com/custom-integrations/legacy-tokensでtokenを発行してください
var postChannel = "<channel>";  // 通知したいチャンネル名

function awsAmountMail2Slack() {

  // 泥臭く件名で取得
  var q = "subject:Amazon Web Services Invoice Available [Invoice ID:";

  // 毎月の最新の請求書メールを１つ取得する
  var threads = GmailApp.search(q, 0, 1);

  var count = threads.length;

  for (var i = 0; i < count; i++) {
    var thread = threads[i];
    var lastDate = thread.getLastMessageDate();		
    var formatDate = lastDate.getFullYear() + "/" + (lastDate.getMonth() + 1) + "/" + lastDate.getDate();

    // チャット、スパム、ごみ箱以外
    if (thread.isInChats() || thread.isInSpam() && thread.isInTrash()) {
      continue;
    }
     
    // 1件のみを送信
    if(thread.getMessageCount() > 0) {
      var msgs = thread.getMessages();
      // 添付ファイルを展開
      var attchs = msgs[0].getAttachments();
      if(attchs.length > 0) {
        var attch = attchs[0];
        // upload file to slack
        uploadFile2Slack(attch.copyBlob(), attch.getName(), '[' + formatDate + ']発行AWS請求書');
      }      
    }
  }
}

// File送信
function uploadFile2Slack(file, filename, title) {
  var postUrl = 'https://slack.com/api/files.upload';  
  var payload = {
    'token': apiToken,
    'filename': filename,
    'file': file,
    'title': title,
    'channels': postChannel,
    'initial_comment': ':moneybag: AWS請求書が新規作成されました'
  };
  
  var options = {
     'method' : 'post',
     'payload' : payload
  };
  
  UrlFetchApp.fetch(postUrl, options);
}