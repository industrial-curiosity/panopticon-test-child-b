# ts-order-service

TypeScript modules for order API routes, event publication, SQS order jobs, attachment storage, and inventory, payment, and shipping integrations. The repository does not include an application bootstrap that wires these modules together.

## Build and run

```bash
npm run build   # compile TypeScript → dist/
npm run dev     # run with ts-node (no compile step)
npm run worker  # start the SQS long-poll worker
```
