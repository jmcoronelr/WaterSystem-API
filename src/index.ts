import express, {Application, Request, Response} from 'express';

const app:Application = express();
const port = process.env.PORT || 3000;

app.get('/', (req:Request, res:Response) =>{
    res.send('Main Page !');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
