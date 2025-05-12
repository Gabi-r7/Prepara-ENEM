import express from 'express';
const { processEssay } = require('./scriptGemini.mjs');
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const routes = express.Router();

//logi
routes.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Adicione a lógica de autenticação aqui
    if (email === 'test@gmail.com' && password === 'password') {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

//questoes
routes.post('/questions', (req, res) => {
    const {filters} = req.body;
});

//redacao
routes.post('/essay/send-essay', async (req, res) => {
    const { essayText, themeText } = req.body;
    const feedback = await processEssay(themeText, essayText);
    console.log('feedback:', feedback);

    res.status(200).json({ feedback });
});

// Rota teste para verificar se o Prisma está funcionando
routes.get('/test', async (req, res) => {
    res.send(await prisma.usuario.findMany());
});

export default routes;