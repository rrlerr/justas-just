// server/auth.ts
import express from 'express';
import bodyParser from 'body-parser';

const router = express.Router();
router.use(bodyParser.json());

interface User {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'employee';
  blocked: boolean;
}

let users: User[] = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin', blocked: false },
  { id: 2, username: 'employee1', password: 'emp123', role: 'employee', blocked: false }
];

const sessions: Record<string, any> = {};

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user || user.blocked) {
    return res.status(401).json({ error: 'Invalid credentials or access blocked' });
  }

  const token = `${user.id}-${Date.now()}`;
  sessions[token] = { userId: user.id, loginTime: new Date().toISOString() };

  res.json({ token, role: user.role });
});

router.post('/logout', (req, res) => {
  const { token } = req.body;
  delete sessions[token];
  res.sendStatus(200);
});

router.get('/sessions', (req, res) => {
  res.json(sessions);
});

export default router;
