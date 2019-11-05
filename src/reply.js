import axios from 'axios'

//★ここから
var messageArray = [
'この人生以上に硬貨な死を望む', 
'母はいつも言うんだ　あなたの幸せな笑顔がみんなを楽しませると',
'ずっとハッピーなのは難しい',
'何が幸せだ　幸せなど一度もなかった',
'だが今わかった、僕の人生は喜劇だ',
'僕が舗道で死んでいても踏みつけるだろう？'
];

var hoakinMessage =  messageArray[Math.floor(Math.random() * messageArray.length)];
//★ここまで

exports.handler = async function(event, context, callback) {
  const webhookBody = JSON.parse(event.body)
  const targetEvent = body.events[0]

  //メッセージ差し替え条件
  const matchResult = targetEvent.message.text.match(/[\d+]|仕事はどう？/)
  
  if (matchResult) {
    hoakinMessage = 'ネガティブに決まってるだろ'
  }

  const data = {
    replyToken: webhookBody.events[0].replyToken,
    messages: [
      {
        type: 'text',
        text: hoakinMessage
      }
    ]
  }
  console.log(data)

  const res = await axios.post('https://api.line.me/v2/bot/message/reply', data, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.CHANNEL_TOKEN}`
    }
  })
  console.log(res)

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(event)
  })
}
