# Panopticon documentation changelog

## 2026-07-19

- `README.md` described runnable service commands despite the missing application entry point;
  refreshed the setup and runtime limitations and added the required architecture links.
- `docs/architecture.md` omitted the required template sections and showed internal component
  calls that are not wired in source; regenerated it from the current modules and interfaces.
- `docs/components/api.md`, `docs/components/clients.md`, `docs/components/events.md`, and
  `docs/components/storage.md` contained stale interface names or evidence; refreshed them from
  the current index and source.
- `docs/components/queue.md` was missing for the real queue component; generated it from the SQS
  declaration, processor, and worker.
- `docs/operations.md` did not follow the operational template and described the repo as runnable
  and deployable; regenerated it with the current build, configuration, and operational gaps.
- `ts-order-service.md` described absent hint comments, stale canonical names, and interface
  evidence not present in the repo; revised the fixture reference to match current source and the
  refreshed local index.
