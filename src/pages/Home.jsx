import React from "react";
import CardProduto from "../components/CardProduto";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

// Importação de componentes
import NavBarra from "../components/NavBarra";

// Url da api
const url = "http://localhost:5000/produtos"

// Estado inicial do formulário

const Home = () => {
  //Lista com produtos
  const [cads, setCads] = useState([]);

  //UseEffect pra puxar os dados da api
  useEffect(() => {
    async function fetchData() {
      try {
        const req = await fetch(url);
        const cads = await req.json();
        setCads(cads);
      } catch (erro) {
        console.log(erro.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ height: "220vh", background: "#ffcbdb"}}>
      <NavBarra />
      <h1 style={{ margin: "50px", color: "black" }}>Bolos</h1>
      <div className="container">
        <div className="lista-produtos d-flex gap-3 mt-3 justify-content-start flex-wrap col-12">
          {cads.map((prod) => (
            <CardProduto
              key={prod.id}
              id={prod.id}
              nome={prod.nome}
              descricao={prod.descricao}
              preco={prod.preco}
              Tipo={prod.Tipo}
              imagemUrl={prod.imagemUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

