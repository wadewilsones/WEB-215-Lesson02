import express from "express";
import userCtrl from '../controllers/user.controller';

const router = express.Router();

router.route('/api/users')
.get(userCtrl.list)
.post(usreCtrl.create)

router.route('/api/users/:userId')
.get(userCtrl.read)
.put(usreCtrl.update)
.delete(usreCtrl.remove)

router.param('userId', userCtrl.userByID)

export default router;