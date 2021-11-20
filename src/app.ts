import express from 'express';
import cors from 'cors';
import erouter from './routes/erouter';

const app = express();

app.set('PORT', process.env.PORT || 8080);

// MÒDULS DE SERVIDOR
app.use(express.json());

// ENDPOINTS
// routes. @ip/api/<endpoint>
app.use('/api', erouter);