const amqp = require('amqplib')

const QUEUE = 'hello'

async function start() {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()

  channel.assertQueue(QUEUE, { durable: false })

  console.log(`[*] Waiting for messages in ${QUEUE}. To exit press CTRL+C`)

  channel.consume(
    QUEUE,
    msg => console.log(`[*] Received ${msg.content.toString()}`),
    { noAck: true }
  )
}
start()
