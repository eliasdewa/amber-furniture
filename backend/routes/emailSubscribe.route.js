import express from 'express';
import { emailSubscribe, getAllSubscribedUsers } from '../controllers/emailSubscribe.controller.js';

const emailRouter = express.Router();

// email subscribe
emailRouter.post('/subscribe', emailSubscribe);
// get all subscriptions
emailRouter.get('/list', getAllSubscribedUsers);


export default emailRouter;