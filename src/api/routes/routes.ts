
import multer from 'multer';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import prisma from '../../prisma/client';
import fs from 'fs';
import path from 'path';

// Instância do express
const routes = express.Router();

// Chave secreta para criação de token
const secretKey = process.env.SECRET_KEY || 'G4bR13lC0d3bL0X';

// Middleware para parsear cookies
routes.use(cookieParser());

// Função para criar token
const createToken = (user: any) => {
    return jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
};

// Configuração do multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'profileImgUploads/'); // Diretório onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
    }
});
// Instância do multer
const upload = multer({ storage: storage });

// Função para verificar token
const authenticate = async (req: any, res: any, next: any) => {
    const token = req.cookies.auth_token;

    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'Não autorizado',
            data: null
        });
    }

    jwt.verify(token, secretKey, async (err: any, decoded: any) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({
                    status: 'error',
                    message: 'Token expirado, faça login novamente',
                    data: null
                });
            }
        
            return res.status(401).json({
                status: 'error',
                message: 'Token inválido',
                data: null
            });
        }
        req.user = decoded;
        next();
    });
}


//
//                              ROTAS
//

// //           ROTA PERFIL DE USUÁRIO
// routes.get('/profile', authenticate, async (req: any, res: any) => {
//     const userId = req.user.id;

//     try {
//         const user = await prisma.user.findUnique({
//             where: { id: userId },
//             select: {
//                 id: true,
//                 login: true,
//                 email: true,
//                 password: true,
//                 experience: true,
//                 profileImage: true,
//                 questions_answered: true,
//                 correct_answers: true,
//                 wrong_answers: true,
//             }
//         });

//         if (!user) {
//             return res.status(404).json({
//                 status: 'error',
//                 message: 'Usuário não encontrado',
//                 data: null
//             });
//         }
//         res.status(200).json({
//             status: 'success',
//             data: user
//         });
//     } catch (error) {
//         res.status(500).json({
//             status: 'error',
//             message: 'Erro ao buscar dados do usuário',
//             data: null
//         });
//     }
// });

// routes.post('/loadQuestions', authenticate, async (req: any, res: any) => {
//     let aleatorio = false;
//     let { ano, tipo } = req.body;
//     const filePath = path.join(__dirname, '..', '..', 'assets', 'json', 'arrayPerguntas.json');
    
//     fs.readFile(filePath, 'utf-8', (err: NodeJS.ErrnoException | null, data: string) => {
//         if (err) {
//             console.error('Error reading file:', err);
//             return res.status(500).json({ error: 'Failed to load questions' });
//         }

//         console.log(ano, tipo);
//         if (tipo.indexOf('aleatorio') !== -1) {
//             aleatorio = true;
//             tipo = tipo.filter((t: string) => t !== 'aleatorio');
//         }
        
//         const questions = JSON.parse(data);

//         let filteredQuestions: any[] = [];
//         for (let i = 0; i < tipo.length; i++) {
//             filteredQuestions = filteredQuestions.concat(...Object.values(questions[ano][tipo[i]]));
//         }

//         let questionList = Object.values(filteredQuestions).flat(); //parei aqui
//         console.log(questionList);
//         if (aleatorio) {
//             questionList.sort(() => Math.random() - 0.5);
//         }     

//         res.status(200);
//         res.json({ questionList });
//     });
// });

// routes.get('/loginVerify', authenticate, async (req: any, res: any) => {
//     if (req.cookies.auth_token) {
//         const userId = req.user.id;
//         const login = await prisma.user.findUnique({
//             where: {id: userId },
//             select: {
//                 login: true
//             }
//         });
//         return res.status(200).json({
//             status: 'success',
//             message: ' está logado',
//             data: login?.login.toString()
//         });
//     }
//     return res.status(400).json({
//         status: 'error',
//         message: 'Você não está logado',
//         data: null
//     });
// });

// //           ROTA MODIFICAR USUÁRIO, SENHA OU EMAIL
// //não fiz pra imagem
// routes.put('/modify', authenticate, async (req: any, res: any) => {
//     const userId = req.user.id;
//     const { field, value } = req.body;

//     if (!field || !value) {
//         return res.status(400).json({
//             status: 'error',
//             message: 'Preencha todos os campos',
//             data: null
//         });
//     }
    
//     if (field == 'password') {
//         if (value.length < 6) {
//             return res.status(400).json({
//                 status: 'error',
//                 message: 'Senha deve ter no mínimo 6 caracteres',
//                 data: null
//             });
//         }
//         const hashedPassword = await bcrypt.hash(value, 10);
//         await prisma.user.update({
//             where: { id: userId },
//             data: { password: hashedPassword }
//         });
//         return res.status(200).json({
//             status: 'success',
//             message: 'Senha modificada com sucesso',
//             data: null
//         });
//     } else if (field == 'email') {
//         await prisma.user.update({
//             where: { id: userId },
//             data: { email: value }
//         });
//         return res.status(200).json({
//             status: 'success',
//             message: 'Email modificada com sucesso',
//             data: null
//         });
//     } else if (field == 'login') {
//         await prisma.user.update({
//             where: { id: userId },
//             data: { login: value }
//         });
//         return res.status(200).json({
//             status: 'success',
//             message: 'Login modificada com sucesso',
//             data: null
//         });
//     } else if (field == 'profileImage') {
//         await prisma.user.update({
//             where: { id: userId },
//             data: { profileImage: value }
//         });
//         return res.status(200).json({
//             status: 'success',
//             message: 'Imagem de perfil modificada com sucesso',
//             data: null
//         });
//     } else {
//         return res.status(400).json({
//             status: 'error',
//             message: 'Campo inválido',
//             data: null
//         });
//     }
    
// });

// //           ROTA LOGOUT DE USUÁRIO
// routes.post('/logout', (req, res) => {
//     if (!req.cookies.auth_token) {
//         return res.status(400).json({
//             status: 'error',
//             message: 'Você não está logado',
//             data: null
//         });
//     }
//     res.clearCookie('auth_token');
//     res.status(200).json({
//         status: 'success',
//         message: 'Logout realizado com sucesso',
//         data: null
//     });
// });

export default routes;