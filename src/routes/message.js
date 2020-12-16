import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express';
import request from 'request';

const router = Router();

router.get('/', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});

router.get('/api_server', (req, res) => {
  request.post(
      'http://172.31.48.146/messages/1',
      { json: { key: 'value' } },
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log(body);
          }
      }
  );
});






router.get('/:messageId', (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]);
});

router.post('/', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };

  req.context.models.messages[id] = message;

  return res.send(message);
});

router.delete('/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});

export default router;
