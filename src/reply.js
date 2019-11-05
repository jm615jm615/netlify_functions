import axios from 'axios'

//★ここから
var messageArray = ['アンジェ', 'プリンセス', 'ドロシー', 'ベアトリス', 'ちせ'];

var arrayIndex = Math.floor(Math.random() * messageArray.length);
var hoakinMessage =  messageArray[arrayIndex];

console.log(hoakinMessage);
 
//★ここまで

exports.handler = async function(event, context, callback) {
  const webhookBody = JSON.parse(event.body)
  console.log(webhookBody)


  const data = {
    replyToken: webhookBody.events[0].replyToken,
    messages: [
      {
        type: 'text',
        //text: 'ネガティブに決まってるだろ'
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
