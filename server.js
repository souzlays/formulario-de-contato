import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import FormData from './src/backend/models/formDataModel.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Servidor funcionando!');
});

app.post('/api/form-data', async (req, res) => {
    try {
        const { userName, userEmail, consulta, message, acceptContact } = req.body;
        const newFormData = new FormData ({ userName, userEmail, consulta, message, acceptContact });
        await newFormData.save();
        res.status(201).json(newFormData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});    

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
