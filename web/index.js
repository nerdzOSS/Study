import express from 'express';
import { WorkOS } from '@workos-inc/node';
import dotenv from 'dotenv'
dotenv.config()

const workos = new WorkOS(process.env.WORKOS_API_KEY);
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

export default app;
