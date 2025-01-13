import Navbar from "react-bootstrap/Navbar";
import { Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBar = () => (
  <Navbar bg="primary" data-bs-theme="light" variant={"light"}>
    <Container fluid>
      <Navbar.Brand as={NavLink} to={"/"} className={"text-white"}>
        Waiter.app
      </Navbar.Brand>
      <Nav>
        <Nav.Link className={"text-white"} as={NavLink} to={"/"}>
          Home
        </Nav.Link>
        <Nav.Link className={"text-white"} as={NavLink} to={"/add-new-table"}>
          Add new table
        </Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

export default NavBar;
