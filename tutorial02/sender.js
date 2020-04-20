const amqp = require('amqplib')

const QUEUE = 'task_queue'
const MESSAGE = 'Hello World!!!'

async function start() {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()

  channel.assertQueue(QUEUE, { durable: true })

  for (let i = 0; i < 10; i++) {
    channel.sendToQueue(QUEUE, Buffer.from(MESSAGE), { persistent: true })
    console.log(`[x] Message Sent ${MESSAGE}`)
  }

  setTimeout(() => connection.close(), 500);
}
start()
