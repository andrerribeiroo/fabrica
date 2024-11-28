import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

// Importando o hook useState para monitorar
import { useState, useEffect } from "react";

//Importação do navigate pra transitar entre páginas
import { useNavigate } from "react-router-dom";

// Url de API
const url = "http://localhost:5000/usuarios";

const Login = () => {
  //Resetar localstorage
  localStorage.removeItem("usuarios");
  localStorage.removeItem("email");

  // Estado inicial do formulário
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  console.log(email);
  console.log(senha);
  console.log(usuarios);

  // Função para tratar os dados de login

  const [alertClass, setAlertClass] = useState("mb-3 d-none");
  const [alertMessagem, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");

  // UseEffect pra puxar os dados do api
  useEffect(() => {
    async function fetchData() {
      try {
        const req = await fetch(url);
        const users = await req.json();
        setUsuarios(users);
      } catch (erro) {
        console.log(erro.message);
      }
    }
    fetchData();
  }, []);

  // Criando o navigate
  const navigate = useNavigate();

  //guardar informações do usuario no navegador
  const gravarLocalStorage = (usuario) => {
    localStorage.setItem("usuarioLogado", usuario.nome);
    localStorage.setItem("email", usuario.email);
    localStorage.setItem("senha", usuario.senha);
  };

  //Função pra tratar os dados de login
  const handleLogin = (e) => {
    // faz com que a pagina não recarregue
    e.preventDefault();

    // Verificar se há aquele usuário digitados na lista

    const userToFind = usuarios.find((user) => user.email == email);

    if (email != "") {
      if (senha != "") {
        if (userToFind != undefined && userToFind.senha == senha) {
          gravarLocalStorage(userToFind);
          setAlertClass("mb-3 mt-2");
          setAlertVariant("success");
          setAlertMessage("Login efetuado com sucesso");
          alert("Login efetuado com sucesso");
          navigate("/home");
        } else {
          setAlertClass("mb-3 mt-2");
          setAlertMessage("Usuário ou senha inválidos");
        }
      } else {
        setAlertClass("mb-3 mt-2");
        setAlertMessage("O campo senha não pode ser vazio");
      }
    } else {
      setAlertClass("mb-3 mt-2");
      setAlertMessage("O campo email não pode ser vazio");
    }
  };

  return (
    <div
      style={{
        background: "#ffcbdb",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
      }}
    >
      <Container
        style={{
          background: "	#CDCDCD",
          padding: "0",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {/* Coluna da Imagem */}
        <div style={{ flex: 1 }}>
          <img
            src="images.png" // Substitua pelo link da sua imagem de supermercado
            alt="Supermercado"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Coluna do Formulário */}
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
          <h1 style={{ fontSize: "2rem", color: "black" }}>Seja Bem-Vindo</h1>
          <h3 style={{ marginBottom: "30px", color: "black" }}>Fazer Login</h3>

          <span
            style={{ fontSize: "100px", color: "black", margin: "20px" }}
            className="material-symbols-outlined"
          >
            account_circle
          </span>

          <Form style={{ width: "75%", margin: "auto" }} onSubmit={handleLogin}>
            {/* Caixinha de Email */}
            <FloatingLabel
              controlId="floatingInput"
              label="Email"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                style={{ width: "100%", marginRight: "250px" }}
              />
            </FloatingLabel>

            {/* Caixinha de Senha */}
            <FloatingLabel
              controlId="floatingSenha"
              label="Senha"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                }}
                style={{ width: "100%", marginRight: "250px" }}
              />
            </FloatingLabel>

            {/* Alerta caso haja erro */}
            <Alert className={alertClass} variant={alertVariant}>
              {alertMessagem}
            </Alert>

            {/* Botão Entrar */}

            <Button
              style={{ marginTop: "20px", margin: "20px", width: "40%" }}
              variant="success"
              type="submit"
            >
              {" "}
              Entrar na Conta{" "}
            </Button>

            <Button
              style={{ marginTop: "20px", margin: "20px", width: "40%" }}
              variant="secondary"
              type="submit"
              href="/"
            >
              {" "}
              Criar Conta{" "}
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
