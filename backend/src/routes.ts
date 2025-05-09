import express from 'express';

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



export default routes;