import { Router, Request, Response } from 'express';

const router = Router();

// panopticon-interface stripe-api
router.post('/stripe', async (req: Request, res: Response) => {
  res.json({ received: true });
});

// panopticon-interface shipping-api
router.post('/shipping', async (req: Request, res: Response) => {
  res.json({ received: true });
});

export default router;
