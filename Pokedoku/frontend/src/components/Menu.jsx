import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/logo.png";
import './Menu.css'; // Asegúrate de importar el archivo CSS

export default function Menu() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
            <Container fluid>
                <Navbar.Brand className="navbar-brand" href="#">
                    <img src={logo} alt="Logo" className="me-2" style={{ width: '35px', height: 'auto' }} />
                    POKEDOKU
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto"> {/* Alinea los enlaces a la derecha */}
                        <Nav.Link href="#" className="nav-link">Inicio</Nav.Link>
                        <Nav.Link href="#" className="nav-link">Acerca de</Nav.Link>
                        <Nav.Link href="#" className="nav-link">Contacto</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}