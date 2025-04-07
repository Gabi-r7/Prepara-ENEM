import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

//config cors
const corsOptions = {
    origin: 'http://localhost:5173', // Substitua pelo domínio do seu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

// Iniciar o servidor

app.get('/', (req, res) => {
    res.send('Hello World');
});

// const PORT = process.env.PORT || 3333;
const PORT = 3333;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});