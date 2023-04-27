const express = require("express")
const app = express()
const mysql = require("mysql2")
const cors = require("cors")


const db = mysql.createPool({

    host:"localhost",
    user:"root",
    password:"Rumineam26#",
    database:"crudgames",
})

app.use(cors())
app.use(express.json())


//Recebendo os dados enviados através do Axios

app.post("/register", (req, res) => {
const {name, cost, category} = req.body

let mysql = "INSERT INTO descricaogames ( name, cost, category) VALUES (?, ?, ?)";
  db.query(mysql, [name, cost, category], (err, result) => {
    res.send(result);
  });
});



// Quando a função Axios.get é executada, ela envia uma solicitação HTTP GET para a URL fornecida (neste caso, http://localhost:3001/getCards). Em sua aplicação Express, a rota definida para esta URL é executada e retorna os dados da tabela descricaogames como resposta. Em seguida, o Axios captura a resposta recebida e faz com que os dados sejam disponibilizados para uso em seu aplicativo React.
app.get("/getCards",(req, res) => {

  let mysql = "SELECT * from descricaogames"
  db.query(mysql, (err, result) => {
if(err) {
  console.log(err)
} else {
  res.send(result)
}

// A variável result contém os dados obtidos a partir da consulta SQL realizada em sua tabela de banco de dados. A função res.send(result) envia esses dados de volta para o cliente que fez a solicitação.
  })
})

app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  const { cost } = req.body;
  const { category } = req.body;
  let mysql = "UPDATE FROM descricaogames SET name = ?, cost = ?, category = ? WHERE id = ?";
  db.query(mysql, [name, cost, category, id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  let mysql = "DELETE FROM descricaogames WHERE id = ?";
  db.query(mysql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
    console.log("rodando servidor")
})