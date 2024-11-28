import React, { useState, useEffect } from "react";
import CardProduto from "../components/CardProduto";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBarra from "../components/NavBarra";

// URL da API
const url = "http://localhost:5000/produtos";

const Home = () => {
  const [cads, setCads] = useState([]); // Lista de produtos
  const [searchTerm, setSearchTerm] = useState(""); // Termo de pesquisa
  const [filteredCads, setFilteredCads] = useState([]); // Produtos filtrados

  // Carregar os produtos da API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setCads(data);
        setFilteredCads(data); // Inicialmente, exibe todos os produtos
      } catch (error) {
        console.log("Erro ao carregar produtos:", error.message);
      }
    }
    fetchData();
  }, []);

  // Atualizar os produtos exibidos com base na pesquisa
  useEffect(() => {
    const filtered = cads.filter((produto) =>
      produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCads(filtered);
  }, [searchTerm, cads]);

  return (
    <div style={{ height: "220vh", background: "#ffcbdb" }}>
      <NavBarra setSearchTerm={setSearchTerm} />
      <h1 style={{ margin: "50px", color: "black" }}>Bolos</h1>
      <div className="container">
        <div className="lista-produtos d-flex gap-3 mt-3 justify-content-start flex-wrap col-12">
          {filteredCads.map((prod) => (
            <CardProduto
              key={prod.id}
              id={prod.id}
              nome={prod.nome}
              preco={prod.preco}
              tipo={prod.tipo}
              imagemUrl={prod.imagemUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
