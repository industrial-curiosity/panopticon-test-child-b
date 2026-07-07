import { Router, Request, Response } from 'express';

const router = Router();

router.post('/stripe', async (req: Request, res: Response) => {
  res.json({ received: true });
});

router.post('/shipping', async (req: Request, res: Response) => {
  res.json({ received: true });
});

export default router;
