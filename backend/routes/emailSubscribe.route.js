import express from 'express';
import { deleteEmail, emailSubscribe, getAllSubscribedUsers } from '../controllers/emailSubscribe.controller.js';

const emailRouter = express.Router();

// email subscribe
emailRouter.post('/subscribe', emailSubscribe);
// get all subscriptions
emailRouter.get('/list', getAllSubscribedUsers);
// delete subscribed email
emailRouter.delete('/:id', deleteEmail);


export default emailRouter;