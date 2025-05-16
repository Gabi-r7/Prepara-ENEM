import express, { Request, Response, Router } from 'express';
const { processEssay } = require('./scriptGemini.mjs');
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const routes: Router = express.Router();

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
routes.post('/questions', async (req:any, res:any) => {
    const { year } = req.body;

    const ano = await prisma.ano.findFirst({
        where: { ano: String(year) },
        select: { id: true, ano: true }
    });

    if (!ano) return res.status(404).json({ error: 'Ano não encontrado' });

    const questoes = await prisma.questao.findMany({
        where: { ano_id: ano.id },
        include: { alternativas: true }
    });

    res.json({ ano, questoes });
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