import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Form, FormControl } from "react-bootstrap";
import { BagHeart, Cart } from "react-bootstrap-icons";
import Cookies from 'js-cookie';
import { Link, NavLink } from "react-router-dom";

export const Header = ({ user }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <header>
      <div className="navbar">
        <Navbar expand="lg" className="py-2">
          <Container>
            <Navbar.Brand href="/" className="d-flex align-items-center">
              <span>cyber</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              <Form onSubmit={handleSearch} className="d-flex mx-auto mt-3 my-lg-0 w-50">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2 rounded-pill"
                  aria-label="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Form>
              <Nav className="align-items-center gap-3">
                <div className="links d-flex items-center gap-3">
                  <NavLink to="/">Home</NavLink>
                  <NavLink to="/about">About</NavLink>
                  <NavLink to="/contact">Contact Us</NavLink>
                  <NavLink to="/orders">Orders</NavLink>
                </div>
                <div className="icons d-flex items-center gap-3">
                  <NavLink to="/wishlist">
                    <BagHeart size={25} />
                  </NavLink>
                  <NavLink to="/cart">
                    <Cart size={25} />
                  </NavLink>
                  {Cookies.get('token') ? (
                    <NavLink to="/profile">{user.firstName}</NavLink>
                  ) : (
                    <NavLink to="/login">Login</NavLink>
                  )}
                  {user.role === 'admin' && (
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  )}
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className="subnav">
        <div>iPhone </div>
        <div>Samsung </div>
        <div>Google Pixel</div>
        <div>OnePlus </div>
        <div>Xiaomi </div>
        <div>Sony Xperia</div>
      </div>
    </header>
  );
};

export default Header;
