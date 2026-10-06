// Sends tasks to a durable queue. Each "." in a task = 1s of simulated work.
// Usage: npm run produce -- [count]
import { connect } from '../connection.js';

const QUEUE = 'tasks';
const count = Number(process.argv[2] ?? 5);

const { ch, conn } = await connect();
await ch.assertQueue(QUEUE, { durable: true });

for (let i = 1; i <= count; i++) {
  const task = `task ${i} ${'.'.repeat(i % 3 + 1)}`;
  ch.sendToQueue(QUEUE, Buffer.from(task), { persistent: true });
  console.log(`[x] Sent '${task}'`);
}

await ch.close();
await conn.close();
