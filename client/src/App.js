import "./App.css";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import Card from "./components/cards/card";


function App() {
  const [values, setValues] = useState();
  const [listGames, setListGames] = useState()

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  // atualiza só os valores que emitiram o target, o value.target.name em colchetes quer dizer que é dinamico, ou seja, pode ser email, senha, etc
  // nome: bla bla, cost: bla bla, category: bla bla bla
  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      cost: values.cost,
      category: values.category,
    }).then((res) => {

      console.log(res)
    })
  }; //enviando os dados para o servidor local que está sendo executado na porta 3001. 

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response => {

setListGames(response.data)
    }))

  }, [])

  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-title">Scrim Shop</h1>

        <input
          type="text"
          name="name"
          placeholder="Nome"
          className="register-input"
          onChange={handleChangeValues}
        />
        <input
          type="text"
          placeholder="Preço"
          name="cost"
          className="register-input"
          onChange={handleChangeValues}
        />
        <input
          type="text"
          placeholder="Categoria"
          name="category"
          className="register-input"
          onChange={handleChangeValues}
        />

        <button onClick={handleClickButton} className="register-button">
          Cadastrar
        </button>
      </div>

      {typeof listGames !== "undefined" &&
      listGames.map((value) => {
       return <Card key={value.id} listCard={listGames} setListCard={setListGames} id={value.id} 
       name={value.name} 
       cost={value.cost}
       category={value.category}
       ></Card>

       //Enviando os valores pra card pro meio de props

      })}
      
    </div>
  );
}

export default App;
