import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar({ user, setUser }) {
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => setUser(null));
  }

  console.log(user)

  return (
    <Navbar variant="dark" bg="dark" fixed="top">
      <Container>
        <Navbar.Brand href="/nfts">Name goes here </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <NavDropdown title="My Profile" id="basic-nav-dropdown">
            <NavDropdown.Item href={user ? `/user/${user.id}` : null}>
              View my Profile
            </NavDropdown.Item>
            <NavDropdown.Item href="/signup">Sign up</NavDropdown.Item>
            <NavDropdown.Divider />
            {user.length !== 0 ? (
              <NavDropdown.Item href="/login" onClick={handleLogout}>
                Logout
              </NavDropdown.Item>
            ) : (
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
            )}
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
