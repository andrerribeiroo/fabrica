// Importando components
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

// Importando o hook useState para monitorar
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

// Importação de componentes
import NavBarra from "../components/NavBarra";

// URL da API de tipos e produtos
const urlTipo = "http://localhost:5000/tipo";
const urlProdutos = "http://localhost:5000/produtos";

const EditarProduto = () => {
  // Estado para armazenar os tipos de produtos
  const [tipoC, setTipos] = useState([]);

  // Estado para armazenar o termo de busca
  const [searchTerm, setSearchTerm] = useState("");

  // Busca os tipos de produtos da API
  useEffect(() => {
    async function fetchData() {
      try {
        const req = await fetch(urlTipo);
        const tipoC = await req.json();
        setTipos(tipoC);
      } catch (erro) {
        console.log(erro.message);
      }
    }
    fetchData();
  }, []);

  // Link padrão para imagens sem URL definida
  const linkImagem =
    "https://www.malhariapradense.com.br/wp-content/uploads/2017/08/produto-sem-imagem.png";

  // Estados para armazenar os dados do produto
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [tipo, setTipo] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");

  // Estados para exibir alertas
  const [alertClass, setAlertClass] = useState("mb-3 d-none");
  const [alertMessagem, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");

  const navigate = useNavigate();

  // Obter o ID do produto pela URL
  const params = window.location.pathname.split("/");
  const idProd = params[params.length - 1];

  // Busca os dados do produto a ser editado da API
  useEffect(() => {
    async function fetchProduto() {
      try {
        const req = await fetch(`${urlProdutos}/${idProd}`);
        const produto = await req.json();
        setNome(produto.nome);
        setPreco(produto.preco);
        setTipo(produto.tipo);
        setImagemUrl(produto.imagemUrl || "");
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchProduto();
  }, [idProd]);

  // Função para enviar os dados atualizados para a API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nome !== "" && preco !== "") {
      const produto = { nome, preco, tipo, imagemUrl };

      try {
        const req = await fetch(`${urlProdutos}/${idProd}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(produto),
        });

        const res = await req.json();
        console.log(res);

        setAlertClass("mb-3 mt-2");
        setAlertVariant("success");
        setAlertMessage("Produto editado com sucesso");
        alert("Produto editado com sucesso");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setAlertClass("mb-3 mt-2");
      setAlertMessage("Todos os campos obrigatórios devem ser preenchidos");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#ffcbdb" }}>
      {/* Barra de navegação com a funcionalidade de pesquisa */}
      <NavBarra setSearchTerm={setSearchTerm} />
      <Container>
        <h1 style={{ margin: "50px" }}>Editar Produto</h1>

        <form onSubmit={handleSubmit} className="mt-3">
          <Row className="mb-3">
            <Col xs={6}>
              {/* Campo de Nome */}
              <FloatingLabel
                controlId="floatingInputNome"
                label="Nome"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Digite o nome do produto"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </FloatingLabel>

              {/* Campo de Tipo */}
              <Form.Group as={Col} controlId="formGridTipo">
                <Form.Label>Tipo</Form.Label>
                <Form.Select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value="">Selecione um tipo</option>
                  {tipoC.map((t) => (
                    <option key={t.id} value={t.nome}>
                      {t.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Campo de Preço */}
              <Form.Label style={{ margin: "20px" }}>Preço</Form.Label>
              <FloatingLabel
                controlId="floatingInputPreco"
                label="Preço"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  step="0.01"
                  placeholder="Digite o preço do produto"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                />
              </FloatingLabel>
            </Col>

            <Col xs={6}>
              {/* Campo de Imagem */}
              <Form.Group controlId="formFileLg" className="mb-3">
                <FloatingLabel
                  controlId="floatingInputImagem"
                  label="Link da Imagem"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Digite o link da imagem"
                    value={imagemUrl}
                    onChange={(e) => setImagemUrl(e.target.value)}
                  />
                </FloatingLabel>
                <Image
                  src={imagemUrl === "" ? linkImagem : imagemUrl}
                  rounded
                  width={300}
                  height={300}
                  style={{
                    boxShadow:
                      "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)",
                  }}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Alerta de Feedback */}
          <Alert className={alertClass} variant={alertVariant}>
            {alertMessagem}
          </Alert>

          {/* Botão de Enviar */}
          <Button
            variant="success"
            size="lg"
            type="submit"
            style={{ marginBottom: "253px" }}
          >
            Editar Produto
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default EditarProduto;
