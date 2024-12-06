import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/logo.png";
import './Menu.css'; // Asumo que usarás un archivo CSS separado

export default function Menu() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
            <Container fluid> 
                <Navbar.Brand className="navbar-brand">
                    <img src={logo} alt="Logo" className="me-2" style={{ width: '35px', height: 'auto' }} />
                    POKEDOKU
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}
