import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const webhookData = req.body;
    console.log('Received webhook data:', webhookData);
    res.status(200).send('Webhook received successfully');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
