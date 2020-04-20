const amqp = require('amqplib')

const QUEUE = 'task_queue'

async function start() {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()

  channel.assertQueue(QUEUE, { durable: true })
  channel.prefetch(1)

  console.log(`[*] Waiting for messages in ${QUEUE}. To exit press CTRL+C`)

  channel.consume(
    QUEUE,
    msg => {
      console.log(`[*] Received ${msg.content.toString()}`)

      setTimeout(() => {
        channel.ack(msg)
        console.log('[*] Done')
      }, 5000);
    },
    { noAck: false }
  )
}
start()
