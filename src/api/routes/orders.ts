import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  res.json([]);
});

router.post('/', async (req: Request, res: Response) => {
  res.status(201).json({ id: 'ord_new', status: 'pending', items: req.body.items, createdAt: new Date().toISOString() });
});

router.get('/:id', async (req: Request, res: Response) => {
  res.json({ id: req.params.id, status: 'pending', items: [], createdAt: new Date().toISOString() });
});

router.patch('/:id', async (req: Request, res: Response) => {
  res.json({ id: req.params.id, ...req.body, updatedAt: new Date().toISOString() });
});

router.post('/:id/cancel', async (req: Request, res: Response) => {
  res.json({ id: req.params.id, status: 'cancelled', updatedAt: new Date().toISOString() });
});

export default router;
