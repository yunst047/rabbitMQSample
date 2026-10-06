// Consumes tasks one at a time (prefetch 1) and acks after finishing.
// Run several workers to see round-robin load balancing.
import { connect } from '../connection.js';

const QUEUE = 'tasks';

const { ch } = await connect();
await ch.assertQueue(QUEUE, { durable: true });
await ch.prefetch(1);

console.log(`[*] Waiting for tasks in '${QUEUE}'. Ctrl+C to exit.`);

await ch.consume(QUEUE, async (msg) => {
  const task = msg.content.toString();
  const seconds = (task.match(/\./g) ?? []).length;
  console.log(`[x] Received '${task}'`);
  await new Promise((r) => setTimeout(r, seconds * 1000));
  console.log(`[x] Done '${task}'`);
  ch.ack(msg);
}, { noAck: false });
