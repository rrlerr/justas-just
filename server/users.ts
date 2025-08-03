// server/users.ts
import express from 'express';
const router = express.Router();

interface User {
  id: number;
  username: string;
  role: 'admin' | 'employee';
  blocked: boolean;
}

let users: User[] = [
  { id: 1, username: 'admin', role: 'admin', blocked: false },
  { id: 2, username: 'employee1', role: 'employee', blocked: false },
  { id: 3, username: 'employee2', role: 'employee', blocked: true }
];

// Get all users (admin only)
router.get('/list', (req, res) => {
  res.json(users);
});

// Block/unblock user
router.post('/block', (req, res) => {
  const { userId, block } = req.body;
  const user = users.find(u => u.id === userId);
  if (user) {
    user.blocked = block;
    res.sendStatus(200);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

export default router;
