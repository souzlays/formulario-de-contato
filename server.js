import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import FormData from './src/backend/models/formDataModel.js';
import * as dotenv from 'dotenv';

dotenv.config();


const mongoURI = process.env.MONGODB_URI;


const app = express();

const allowedOrigins = [
    "https://formulario-de-contato-1.onrender.com",
    "http://localhost:3000"
];

app.use(cors({
    origin: (origin, callback) => {
        if(!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }else {
            callback(new Error ("Origin not allowed by CORS"))
        }
    }
}));
app.use(bodyParser.json());


mongoose.connect(mongoURI).then(() => {
    console.log('Conexão com o banco de dados estabelecida!');

    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    });
}).catch((erro) => {
    console.error('Erro ao conectar com o banco de dados:', erro.message);
    process.exit(1); 
});

app.get('/', (req, res) => {
    res.send('Servidor funcionando!');
});

app.post('/api/form-data', async (req, res) => {
    try {
        console.log('Corpo da requisição recebido:', req.body);

        const { userName, userEmail, consulta, message, acceptContact } = req.body;

        const newFormData = new FormData({
            userName,
            userEmail,
            consulta,
            message,
            acceptContact
        });

        const savedData = await newFormData.save();

        res.status(201).json({ 
            mensagem: 'Dados do formulário salvos com sucesso',
            dados: savedData 
        });
    } catch (erro) {
        console.error('Erro completo na submissão:', erro);
        
        res.status(500).json({ 
            mensagem: 'Erro ao salvar dados do formulário', 
        });
    }
});
