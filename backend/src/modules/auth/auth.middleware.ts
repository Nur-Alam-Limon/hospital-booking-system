import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../config/jwt';


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }

  (req as any).user = decoded as any;
  next();
};
