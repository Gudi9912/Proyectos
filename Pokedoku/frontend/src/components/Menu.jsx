import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import logo from "../assets/logo.png";
import './Menu.css'; 

export default function Menu() {
    const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  
    const handleShowModal = () => setShowModal(true); // Función para abrir el modal
    const handleCloseModal = () => setShowModal(false); // Función para cerrar el modal
  
    return (
      <>
        <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
          <Container fluid>
            <Navbar.Brand className="navbar-brand" href="#">
              <img src={logo} alt="Logo" className="me-2" style={{ width: '35px', height: 'auto' }} />
              POKEDOKU
            </Navbar.Brand>
            {/* Extras */}
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="#" className="nav-link" onClick={handleShowModal}>Reglas</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
  
        {/* Modal con las reglas del juego */}
        <Modal show={showModal} onHide={handleCloseModal} backdrop={false}>
          <Modal.Header closeButton>
            <Modal.Title>Reglas del Juego</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Bienvenido a Pokedoku. A continuacion se diran algunas consideraciones:
            </p>
            <ol>
              <li>El objetivo del juego es llenar todos los casilleros con pokemons que cumplan las caracteristicas pedidas.</li>
              <li>Starters se refiere a cualquier pokemon que sea elegible como el primero de la aventura en un juego, y sus evoluciones.</li>
              <li>Single se refiere a pokemones que no tienen familia evolutiva.</li>
              <li>Cuando se pide un tipo especifico, no es necesario que el pokemon sea monotipo.</li>
              <li>Cuando se pide una region, el pokemon debe ser originario de esta.</li>
              <li>¡Diviértete y buena suerte!</li>
            </ol>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }