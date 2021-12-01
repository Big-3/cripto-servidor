import express from 'express';
import cors from 'cors';
import rsaRouter from './routes/rsa.router';
import pallierRouter from './routes/pallier.router';

const app = express();

app.set('PORT', process.env.PORT || 8080);

// MÒDULS DE SERVIDOR
app.use(express.json());
app.use(cors());

// ENDPOINTS
// routes. @ip/api/rsa/<endpoint>
app.use('/api/rsa', rsaRouter);
app.use('/api/pallier', pallierRouter);

export default app;