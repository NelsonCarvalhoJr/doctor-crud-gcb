import express from 'express';

import '@shared/infra/typeorm';

const app = express();

app.use(express.json());

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server start on port 3333');
});
