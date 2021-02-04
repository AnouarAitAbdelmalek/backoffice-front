import Axios from "axios";
import React, { Component } from "react";
import { Card, Form, Button, Col, Container, Row } from "react-bootstrap";
import { Route } from "react-router-dom";
import NavigationBar from "../shared/NavigationBar";
import ToastComponent from "../shared/ToastComponent";



class formulaire extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.agent = this.initialState;
    this.state.comptes = [];
    this.state.show = false;
    this.state.see = false;
    this.state.type = "";
  }

  initialState = {
    id: "",
    username: "",
    nom: "",
    prenom: "",
    adresse: "",
    dateNaissance:"",
    email: "",
    emailVerif: "",
    telephone: "",
    cin: "",
    patente: "",
    immatriculation: "",
  };

  componentWillMount() {
    
    this.unlisten = this.props.history.listen((location, action) => {
      this.setState({ agent: this.initialState });
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  componentDidMount() {
  
  }

  

  submit = (event) => {
    event.preventDefault();
    const { email, emailVerif } = this.state.agent;
    // perform all neccassary validations
    if (email !== emailVerif) {
        alert("Email incorrect !");
    } else {
        

    const agent = {
      nom: this.state.agent.nom,
    prenom: this.state.agent.prenom,
    adresse: this.state.agent.adresse,
    dateNaissance: this.state.agent.dateNaissance,
    email: this.state.agent.email,
    telephone: this.state.agent.telephone,
    cin: this.state.agent.cin,
    patente: this.state.agent.patente,
    immatriculation: this.state.agent.immatriculation,
    };

    let authString = sessionStorage.getItem('basicauth');
    
    Axios.post(
      "http://localhost:8082/agent",
      agent,
      {headers : {authorization : authString}}
    ).then((response) => response.data)
    .then(data => {
      setTimeout(() => {
        if (data != null) {
          this.setState({
            show: true,
            type: "success",
          });
          setTimeout(() => {
            this.setState({ show: false });
          }, 3000);
        } else {
          this.setState({
            show: false,
            type: "",
          });
        }
      }, 200);
    })
    ;

    this.setState({ agent: this.initialState });

  }
  };

  

  agentChange = (event) => {
    
     
       this.setState({ ...this.state,
         agent: {
           ...this.state.agent,
           [event.target.name]: event.target.value
         }
       });
     
  };

  render() {
    const { show, type } = this.state;


    return (
      
      <div style={{backgroundColor:"#707080"}}>
        <NavigationBar/>
      <Container>
        <Row>
          <Col lg="12" style={{marginTop: '25px'}}>
        <div style={{ dispaly: show ? "block" : "none" }}>
          <ToastComponent show={show} type={type} />
        </div>

        <Card className="border border-dark text-white bg-dark">
          <Card.Header>
            {"Informations personnelles"}
          </Card.Header>
          <Form
            onSubmit={this.submit}
            id="agentFormId"
          >
            <Card.Body>
              <Form.Group controlId="formGridNom">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Saisissez le nom..."
                  value={this.state.agent.nom}
                  onChange={this.agentChange}
                  required
                  className="bg-dark text-white"
                  name="nom"
                >
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formGridPrenom">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Saisissez le prénom..."
                  value={this.state.agent.prenom}
                  onChange={this.agentChange}
                  required
                  className="bg-dark text-white"
                  name="prenom"
                >
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formGridCin">
                <Form.Label>CIN</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Saisissez le numéro de la CIN..."
                  value={this.state.agent.cin}
                  onChange={this.agentChange}
                  required
                  className="bg-dark text-white"
                  name="cin"
                >
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formGridDateNaissance">
                <Form.Label>Date de naissance</Form.Label>
                <Form.Control
                  type="date"
                  value={this.state.agent.dateNaissance}
                  onChange={this.agentChange}
                  autoComplete="off"
                  required
                  placeholder="Saisissez la date de naissance..."
                  className="bg-dark text-white"
                  name="dateNaissance"
                />
              </Form.Group>

              <Form.Group controlId="formGridAdresse">
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Saisissez l'adresse..."
                  value={this.state.agent.adresse}
                  onChange={this.agentChange}
                  required
                  className="bg-dark text-white"
                  name="adresse"
                >
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Saisissez l'email..."
                  value={this.state.agent.email}
                  onChange={this.agentChange}
                  required
                  className="bg-dark text-white"
                  name="email"
                >
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formGridVerifEmail">
                <Form.Label>Confirmation email</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Saisissez l'email..."
                  value={this.state.agent.emailVerif}
                  onChange={this.agentChange}
                  required
                  className="bg-dark text-white"
                  name="emailVerif"
                >
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formGridTelephone">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Saisissez le numéro de téléphone..."
                  value={this.state.agent.telephone}
                  onChange={this.agentChange}
                  required
                  className="bg-dark text-white"
                  name="telephone"
                >
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formGridPatente">
                <Form.Label>Numéro de patente</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Saisissez le numéro de patente..."
                  value={this.state.agent.patente}
                  onChange={this.agentChange}
                  required
                  className="bg-dark text-white"
                  name="patente"
                >
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formGridImmatriculation">
                <Form.Label>Numéro d'immatriculation</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Saisissez le numéro d'immatriculation..."
                  value={this.state.agent.immatriculation}
                  onChange={this.agentChange}
                  required
                  className="bg-dark text-white"
                  name="immatriculation"
                >
                </Form.Control>
              </Form.Group>

              
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
                <Button variant="success" type="submit">
                  Enregistrer
                </Button>
            </Card.Footer>
          </Form>
        </Card>
        </Col>
        </Row>
        </Container>
      </div>
    );
  }
}

export default formulaire;