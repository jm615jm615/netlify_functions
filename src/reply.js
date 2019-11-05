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

//var arrayIndex = Math.floor(Math.random() * messageArray.length);
//var hoakinMessage =  messageArray[arrayIndex];
var hoakinMessage =  messageArray[Math.floor(Math.random() * messageArray.length)];

//★ここまで

exports.handler = async function(event, context, callback) {
  const webhookBody = JSON.parse(event.body)
  const targetEvent = body.events[0]

  //const matchResult = targetEvent.message.text.match(/仕事はどう？/)
  //indexOf()ではマッチしなかったとき-1を返す。マッチしたときは0以上の整数を返す。
  if(targetEvent.message.indexOf('仕事はどう？') > -1){
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
