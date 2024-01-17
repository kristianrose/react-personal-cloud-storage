import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";

export default function NavBar() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">ToDo</Navbar.Brand>
          <Dropdown>
            <Dropdown.Toggle>{currentUser.email}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/update-email">Update Email</Dropdown.Item>
              <Dropdown.Item href="/update-password">
                Update Password
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#action/3.4" onClick={handleLogout}>
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
      {error && <Alert variant="danger">{error}</Alert>}
    </>
  );
}
