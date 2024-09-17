import express from 'express';
import cors from 'cors';

// app configuration
const app = express();
const port = 5000

// middleware
app.use(express.json());
app.use(cors()); // we can access the backend from any frontend


app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));