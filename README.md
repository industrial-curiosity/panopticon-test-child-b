# ts-order-service

[panopticon-test-child-b architecture](docs/architecture.md)
[panopticon-test-child-b org architecture](https://github.com/industrial-curiosity/panopticon-test/blob/main/docs/architecture.md#panopticon-test-child-b)

TypeScript modules for order API routes, event publication, SQS order jobs, attachment storage, and inventory, payment, and shipping integrations. The repository does not include an application bootstrap that wires these modules together.

## Build and run

Install the Node.js dependencies before running a script:

```bash
npm install
```

- `npm run build` compiles the TypeScript modules into `dist/`.
- `npm run worker` starts the SQS long-poll worker after its required environment is configured.
- `npm run dev` and `npm start` are not runnable in this snapshot because their configured entry points (`src/index.ts` and `dist/index.js`) are absent.

The worker requires `ORDER_PROCESSING_QUEUE_URL` and AWS credentials. See [the operations guide](docs/operations.md) for the complete configuration list.
