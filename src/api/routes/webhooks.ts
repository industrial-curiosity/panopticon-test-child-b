import { Router, Request, Response } from 'express';

const router = Router();

// panopticon-interface stripe-payments
router.post('/stripe', async (req: Request, res: Response) => {
  res.json({ received: true });
});

// panopticon-interface shipping-provider-api
router.post('/shipping', async (req: Request, res: Response) => {
  res.json({ received: true });
});

export default router;
