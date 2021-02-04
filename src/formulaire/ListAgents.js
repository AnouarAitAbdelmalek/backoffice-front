import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./formulaire.css";
import Axios from "axios";
import NavigationBar from "../shared/NavigationBar";

class ListAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agents: [],
      currentPage: 1,
      numberPerPage: 5,
      comptes: [],
    };
  }

  path = window.location.origin;

  componentWillMount() {
    if((sessionStorage.getItem('username') === null)) window.location.reload();
  }
  componentDidMount() {
    
    this.getAllAgents();

  }

  changePage = (event) => {
    let agentsLength = this.state.agents.length;
    if (
      (event.target.value > 0) &
      (event.target.value <
        Math.ceil(agentsLength / this.state.numberPerPage) + 1)
    ) {
      this.setState({
        currentPage: parseInt(event.target.value),
      });
    }
  };

  firstPage = () => {
    if (this.state.currentPage > 1)
      this.setState({
        currentPage: 1,
      });
  };

  prevPage = () => {
    if (this.state.currentPage > 1)
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
  };

  nextPage = () => {
    let agentsLength = this.state.agents.length;
    if (
      this.state.currentPage <
      Math.ceil(agentsLength / this.state.numberPerPage)
    )
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
  };

  lastPage = () => {
    let agentsLength = this.state.agents
      .length;
    if (
      this.state.currentPage <
      Math.ceil(agentsLength / this.state.numberPerPage)
    )
      this.setState({
        currentPage: Math.ceil(
          agentsLength / this.state.numberPerPage
        ),
      });
  };

  getAllAgents = () => {
    let authString = sessionStorage.getItem('basicauth');
    Axios.get("http://localhost:8082/agents",
    {headers : {authorization : authString}})
    .then((response) => response.data)
    .then((data) => {
      this.setState({
        agents : data,
        })
      });
  };

  

  render() {
    
    const { currentPage, numberPerPage, agents } = this.state;
    const lastIndex = currentPage * numberPerPage;
    const firstIndex = lastIndex - numberPerPage;
    const currentList = agents.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(agents.length / numberPerPage);

    return (
      <div style={{backgroundColor:"#707080"}}>
        <NavigationBar />
      <Container>
        <Row>
          <Col lg="14" style={{marginTop: '25px'}}>

          <br></br>
        <ButtonGroup style={{ display: "flex", justifyContent: "center" }}>
                        <Link
                          to={{
                            pathname: "form",
                            state: { fromDashboard: true },
                          }}
                          className="btn btn-info"
                          
                          
                        >
                          <img
                            src={this.path+"/images/add-white.png"}
                            width="20"
                            style={{ marginRight: "10px" }}
                            alt="Add"
                          />
                           Ajouter un agent
                        </Link>
          </ButtonGroup>
        <br></br>
        <br></br>

          <Card className="border border-dark bg-dark text-white">
        <Card.Header>Liste des agents</Card.Header>
        <Card.Body>
          
          <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Date de naissance</th>
                <th>CIN</th>
                <th>Email</th>
                <th>Tel</th>
                <th>Adresse</th>
                <th>Patente</th>
                <th>Immatriculation</th>
              </tr>
            </thead>
            <tbody>
              {agents.length === 0 ? (
                <tr align="center">
                  <td colSpan="10">Aucun agent existe.</td>
                </tr>
              ) : (
                currentList.map((agent) => (
                  <tr key={agent.id}>
                    <td>{agent.nom}</td>
                    <td>{agent.prenom}</td>
                    <td>{agent.dateNaissance}</td>
                    <td>{agent.cin}</td>
                    <td>{agent.email}</td>
                    <td>{agent.telephone}</td>
                    <td>{agent.adresse}</td>
                    <td>{agent.patente}</td>
                     <td>{agent.immatriculation}</td>

                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
        <Card.Footer>
          <div style={{ float: "left" }}>
            Page {currentPage} de {totalPages}
          </div>

          <div style={{ float: "right" }}>
            <InputGroup>
              <InputGroup.Prepend>
                <Button
                  type="button"
                  variant="outline-secondary"
                  disabled={currentPage === 1 ? true : false}
                  onClick={this.firstPage}
                >
                  <img
                    src={this.path+"/images/first.png"}
                    width="20"
                    alt="first"
                  />
                </Button>
                <Button
                  type="button"
                  variant="outline-secondary"
                  disabled={currentPage === 1 ? true : false}
                  onClick={this.prevPage}
                >
                  <img
                    src={this.path+"/images/prev.png"}
                    width="20"
                    alt="prev"
                  />
                </Button>
              </InputGroup.Prepend>

              <FormControl
                className={" bg-dark page-num"}
                name="currentPage"
                value={currentPage}
                onChange={this.changePage}
                type="text"
                pattern="[0-9]+"
              />

              <InputGroup.Append>
                <Button
                  type="button"
                  variant="outline-secondary"
                  disabled={currentPage === totalPages ? true : false}
                  onClick={this.nextPage}
                >
                  <img
                    src={this.path+"/images/next.png"}
                    width="20"
                    alt="next"
                  />
                </Button>

                <Button
                  type="button"
                  variant="outline-secondary"
                  disabled={currentPage === totalPages ? true : false}
                  onClick={this.lastPage}
                >
                  <img
                    src={this.path+"/images/last.png"}
                    width="20"
                    alt="last"
                  />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </Card.Footer>
      </Card>
          </Col>
          </Row>
          </Container>
          </div>
      
    );
  }
}

export default ListAgent;
