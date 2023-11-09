import express from 'express';
import times from './dados/dados.js';

const app = express();

const buscaPorNome = (nomeTime) => {
    return times.filter(time => time.nome.toLowerCase().includes(nomeTime.toLowerCase()));
}

app.get('/times', (req,res) => {
    const nomeTime = req.query.busca;
    const resultado = nomeTime ? buscaPorNome(nomeTime) : times;

    if (resultado.length > 0) {
        res.json(resultado);
    } else {
        res.status(404).send({ "erro" : "Nenhum nome encontrado" })
    };
});

/*
// Esta rota estática foi um teste, para verificar a resposta da API
app.get('/times/teste', (req,res) => {
    res.send({ "teste": "teste"});
});
*/

// Rota dinâmica, a API retorna o valor do id especifico.
app.get('/times/:idtimes', (req,res) => {
    const idtimes = parseInt(req.params.idtimes);
    let time;
    let mensagemErro;

    if (!(isNaN(idtimes))) {
        time = times.find(t => t.id === idtimes);
        if (!time){
            mensagemErro = "ID não encontrado"
        }
    } else {
        mensagemErro = "Requisição invalida"
    }

    if (time) {
        res.json(time);
    } else {
        res.status(404).send({"erro": mensagemErro});
    };
    
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080");
});