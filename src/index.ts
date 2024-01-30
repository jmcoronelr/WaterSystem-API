import express, { Application, Request, Response } from "express";
import userRoutes from '../routes/Users';
const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Main Page !");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
