const amqp = require('amqplib')

const QUEUE = 'hello'
const MESSAGE = 'Hello World!!!'

async function start() {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()

  channel.assertQueue(QUEUE, { durable: false })
  channel.sendToQueue(QUEUE, Buffer.from(MESSAGE))

  console.log(`[x] Message Sent ${MESSAGE}`)

  setTimeout(() => connection.close(), 500);
}
start()
