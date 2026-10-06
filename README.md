# RabbitMQ + Node.js Sample

Minimal examples of two classic RabbitMQ patterns using [`amqplib`](https://github.com/amqp-node/amqplib):

| Pattern | Files | What it shows |
|---|---|---|
| **Work queue** | `src/work-queue/producer.js`, `worker.js` | Durable queue, persistent messages, manual `ack`, `prefetch(1)` fair dispatch across workers |
| **Pub/Sub** | `src/pubsub/publisher.js`, `subscriber.js` | Fanout exchange; each subscriber gets its own exclusive queue, so all receive every message |

## Prerequisites
- Node.js 20+
- Docker (for RabbitMQ)

## Run

```bash
npm install
npm run rabbit:up          # starts rabbitmq:4-management, waits until healthy
```

Management UI: http://localhost:15672 (guest / guest)

### Work queue
```bash
npm run worker             # terminal 1 (start more workers to see load balancing)
npm run worker             # terminal 2
npm run produce -- 10      # terminal 3: send 10 tasks (each "." = 1s of fake work)
```

### Pub/Sub
```bash
npm run subscribe          # terminal 1
npm run subscribe          # terminal 2
npm run publish -- "hello everyone"   # both subscribers print it
```

Stop RabbitMQ with `npm run rabbit:down`.

## Config
Set `AMQP_URL` to point at another broker (default `amqp://guest:guest@localhost:5672`). See `.env.example`.
