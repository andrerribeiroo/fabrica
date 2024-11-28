// Importando os componentes necessários do React-Bootstrap
import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// URL da API do JSON Server
const url = "http://localhost:5000/usuarios"; // Endereço onde o JSON Server está rodando

const CadastroUsuario = () => {
  // Estados para armazenar os dados do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  
  // Estado para o alerta de feedback
  const [alertClass, setAlertClass] = useState("d-none");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");

  const navigate = useNavigate(); // Hook para navegação

  // Função para validar e cadastrar o usuário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregamento da página

    // Validação dos campos
    if (!nome || !email || !senha) {
      setAlertClass("mb-3 mt-2");
      setAlertMessage("Todos os campos devem ser preenchidos");
      return;
    }

    // Criando o objeto do usuário
    const novoUsuario = { nome, email, senha };

    try {
      // Enviando os dados para o JSON Server
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoUsuario),
      });

      // Verificando se o cadastro foi bem-sucedido
      if (res.ok) {
        setAlertClass("mb-3 mt-2");
        setAlertVariant("success");
        setAlertMessage("Usuário cadastrado com sucesso!");
        alert("Cadastro realizado com sucesso!");

        // Redirecionando para a página de login ou home após o cadastro
        setTimeout(() => {
          navigate("/login"); // Redireciona para a página de login (ou outra página)
        }, 2000);
      } else {
        throw new Error("Erro ao cadastrar usuário");
      }
    } catch (error) {
      console.log(error);
      setAlertClass("mb-3 mt-2");
      setAlertMessage("Houve um erro ao cadastrar o usuário. Tente novamente.");
    }
  };

  return (
    <div style={{ minHeight: "100vh",
        background: "#ffcbdb",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
      }}>
      <Container style={{
          background: "#CDCDCD",
          padding: "0",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          display: "flex",
          overflow: "hidden"}}>
        
        {/* Coluna da Imagem */}
        <div style={{ flex: 1 }}>
          <img
            src="bolo-morango.png" // Substitua pelo link da sua imagem de supermercado
            alt="Supermercado"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div
          style={{
            flex: 1,
            padding: "140px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        {/* Formulário de cadastro */}
        <form onSubmit={handleSubmit} className="mt-3">
          {/* Alerta de feedback */}
          <Alert className={alertClass} variant={alertVariant}>
            {alertMessage}
          </Alert>
          <h1 style={{ margin: "10px" }}>Seja Bem-Vindo</h1>
          <h3 style={{ margin: "10px" }}>Faça seu cadastro</h3>
          <h1 style={{ margin: "10px" }}>Cadastro de Usuário</h1>
          {/* Campo para o nome */}
          <Form.Group controlId="formNome" className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Form.Group>

          {/* Campo para o email */}
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          {/* Campo para a senha */}
          <Form.Group controlId="formSenha" className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </Form.Group>

          {/* Botão para submeter o formulário */}
          <Button variant="success" size="lg" type="submit">
            Cadastrar
          </Button>
        
        </form>
        </div>
      </Container>
    </div>
  );
};

export default CadastroUsuario;
