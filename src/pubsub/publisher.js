// Broadcasts a message to every subscriber via a fanout exchange.
// Usage: npm run publish -- "your message"
import { connect } from '../connection.js';

const EXCHANGE = 'logs';
const message = process.argv.slice(2).join(' ') || `hello at ${new Date().toISOString()}`;

const { ch, conn } = await connect();
await ch.assertExchange(EXCHANGE, 'fanout', { durable: false });
ch.publish(EXCHANGE, '', Buffer.from(message));
console.log(`[x] Published '${message}'`);

await ch.close();
await conn.close();
