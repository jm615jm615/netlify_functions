import axios from 'axios'

exports.handler = async function(event, context, callback) {
  const webhookBody = JSON.parse(event.body)
  console.log(webhookBody)


var data = ['アンジェ', 'プリンセス', 'ドロシー', 'ベアトリス', 'ちせ'];
 
var getData = choose_at_random(data);
console.log(getData);
 
/**
 * 配列の値からランダムで1つ選択して返す
 * @param arr arrayData (required) 選択する配列の内容
 * @return str
 */
function choose_at_random(arrayData) {
    var arrayIndex = Math.floor(Math.random() * arrayData.length);
    return arrayData[arrayIndex];
}



  const data = {
    replyToken: webhookBody.events[0].replyToken,
    messages: [
      {
        type: 'text',
        //text: 'ネガティブに決まってるだろ'
        text: getData
      }
    ]
  }

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
