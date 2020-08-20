import express from 'express';
import schedule from './src/api/schedule/router';
import cors from 'cors';
const app = express();
app.use(express.json());

app.use(cors());

app.use(schedule.path, schedule.router);


app.listen(3000, () => {
    console.log('localhost:3000');
});
