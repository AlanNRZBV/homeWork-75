import { Router } from 'express';
import { IDecoded} from '../types';
const Vigenere = require('caesar-salad').Vigenere;

export const decoderRouter = Router();

decoderRouter.post('/', (req, res) => {

  const decodedMsg: IDecoded = {
    decoded: Vigenere.Decipher(req.body.password).crypt(req.body.message)
  }

  res.send(decodedMsg);
})