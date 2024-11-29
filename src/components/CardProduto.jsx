import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CardProduto = (props) => {
  // Funcao pra deletar um produto
  const handleDelete = async (e) => {
    const req = await fetch(`http://localhost:5000/produtos/${props.id}`, {
      method: "DELETE",
    });
    const res = await req.json();
    console.log(res);
    alert(`Produto ${res.nome} removido com sucesso 😍`);
  };

  return (
    <div>
      <Card style={{ width: "22rem", height: "30rem", margin: "30px", border: "2px solid black", boxShadow: "0px 0px 50px black"}}>
        {/* Imagem do Card */}

        <Card.Img variant="end" src={props.imagemUrl} height="200px" style={{borderBottom: "1px solid black"}} />
        <Card.Body>
          {/* Título do card com nome do produto */}

          <Card.Title>{props.nome}</Card.Title>

          {/* Subtitulo no card com preco do produto */}
          <Card.Subtitle className="mb-2 text-muted">
            Preço: {props.preco}
          </Card.Subtitle>

          <Card.Text>
            <b> Tipo: </b> <br></br> {props.tipo}
          </Card.Text>

          <Card.Link href={`/produto/editar/${props.id}`}>
            <Button variant="primary">Editar</Button>
          </Card.Link>

          <Card.Link href="/home">
            <Button variant="danger" type="button" onClick={handleDelete}>
              Excluir
            </Button>
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardProduto;
