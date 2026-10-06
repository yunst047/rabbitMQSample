// Each subscriber gets its own exclusive, auto-deleted queue bound to the exchange,
// so every running subscriber receives every message.
import { connect } from '../connection.js';

const EXCHANGE = 'logs';

const { ch } = await connect();
await ch.assertExchange(EXCHANGE, 'fanout', { durable: false });
const { queue } = await ch.assertQueue('', { exclusive: true });
await ch.bindQueue(queue, EXCHANGE, '');

console.log(`[*] Subscribed to '${EXCHANGE}' via ${queue}. Ctrl+C to exit.`);

await ch.consume(queue, (msg) => {
  console.log(`[x] ${msg.content.toString()}`);
}, { noAck: true });
