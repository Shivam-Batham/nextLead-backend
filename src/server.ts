import express, { type Request, type Response } from 'express';

const app = express();
app.use(express.json({ limit: '100kb' }));

app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'Server is 100% healthy.',
  });
});

export { app };
