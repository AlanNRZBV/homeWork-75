import express from 'express';
import cors from 'cors';
import { encoderRouter } from './routers/Encoder';
import { decoderRouter } from './routers/Decoder';

const port = 8000;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/encode', encoderRouter);
app.use('/decode', decoderRouter);

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
