import { Router, Request, Response } from 'express';
import Crowller from './crowller';
import Analyze from './analyzer';
const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('hello world2');
});

router.get('/getData', (req: Request, res: Response) => {
  const url = `http://www.kdxs.com/`;

  const analyzer = Analyze.getInstance();
  new Crowller(url, analyzer);

  res.send('getData Sucess!');
});

export default router;
