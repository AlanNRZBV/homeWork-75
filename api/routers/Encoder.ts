import { Router } from 'express';
import { IEncoded } from '../types';
const Vigenere = require('caesar-salad').Vigenere;

export const encoderRouter = Router();

encoderRouter.post('/', (req, res) => {

  const encodedMsg: IEncoded = {
    encoded: Vigenere.Cipher(req.body.password).crypt(req.body.message)
  }

  res.send(encodedMsg);
})