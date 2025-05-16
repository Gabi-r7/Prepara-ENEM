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
// routes.post('/questions', (req, res) => {
//     const {filters} = req.body;
// });

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

// Rota para pegar uma questao
routes.post('/questions', async (req:any, res:any) => {
    const { year, index } = req.body;

    try {
        const questao = await prisma.questao.findUnique({
            where: {
                ano_id: Number(year),
                id: Number(index)
            },
            include: {
                alternativas: true,
                files: true,
                disciplinas: {
                    include: { disciplina: true }
                }
            }
        });

        if (!questao) {
            return res.status(404).json({ error: 'Questão não encontrada' });
        }

        res.json(questao);
        // console.log('questao:', questao);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar questão', details: error });
    }
});

export default routes;