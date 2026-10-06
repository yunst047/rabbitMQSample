import amqp from 'amqplib';

export const AMQP_URL = process.env.AMQP_URL ?? 'amqp://guest:guest@localhost:5672';

// Opens a connection + channel and closes both cleanly on Ctrl+C.
export async function connect() {
  const conn = await amqp.connect(AMQP_URL);
  const ch = await conn.createChannel();

  const close = async () => {
    try {
      await ch.close();
      await conn.close();
    } finally {
      process.exit(0);
    }
  };
  process.once('SIGINT', close);
  process.once('SIGTERM', close);

  return { conn, ch, close };
}
