import mongoose from "mongoose";

// Conexão com o MongoDB
mongoose.connect('mongodb://127.0.0.1/banco-do-formulario', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexão com o banco de dados estabelecida!');
}).catch((err) => {
    handleError(err);
});

// Definir a função handleError
function handleError(error) {
    console.error('Erro ao conectar com o banco de dados:', error);
}
