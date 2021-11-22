import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NFTicketsNavbar() {
    return (<Navbar bg="light" expand="lg">
    <Container>
        <Navbar.Brand>NFTickets</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
        <Link to="/" className="mx-3 mt-6" style={{color:"grey"}}>Home</Link>

        <Link to="my-tickets" className="mx-3 mt-6" style={{color:"grey"}}>My Tickets</Link>
        <Link to="create-tickets" className="mx-3 mt-6" style={{color:"grey"}}>Create tickets</Link>
    {/*    <NavDropdown title="Dropdown" id="basic-nav-dropdown">*/}
    {/*<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
    {/*    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>*/}
    {/*<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
    {/*<NavDropdown.Divider />*/}
    {/*<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
    {/*</NavDropdown>*/}
    </Nav>
    </Navbar.Collapse>
    </Container>
    </Navbar>)
}
