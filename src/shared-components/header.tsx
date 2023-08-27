'use client'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from "next/link";

export default function Header() {
  return <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand>
        <Link href={"/"} className="navbar-brand">Home</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link href={"/blogs"} className="nav-link">Blogs</Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
}
