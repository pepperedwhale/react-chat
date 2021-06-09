import { Form, Button, Modal, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
const md5 = require("md5");
const axios = require("axios");

let idGen = uuidv4();

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toast, settoast] = useState(false);
  const [success, setSuccess] = useState(false);
  const showt = () => settoast(true);

  const shows = () => setSuccess(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div
        style={{
          width: "30vw",
          marginLeft: "35vw",
          marginTop: "25vh",
          padding: "2vw",
          borderRadius: "3%",
          backgroundColor: "#e9ecef",
        }}
      >
        <h1>React-Chat-App</h1>
        <Form>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter Username" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="success" type="submit">
            Login
          </Button>
          <Button
            variant="secondary"
            type="submit"
            style={{ marginLeft: "0.5vh" }}
            onClick={(e) => {
              e.preventDefault();
              handleShow();
            }}
          >
            Create account
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>Your UUID is: {idGen}</Modal.Body>
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              style={{ marginLeft: "1vw", width: "25vw", marginBottom: "1vw" }}
              value={username}
              onChange={(e) => {
                e.preventDefault();
                setUsername(e.target.value);
              }}
            ></input>
            <Form.Group
              controlId="formBasicPassword"
              style={{ marginLeft: "1vw", width: "25vw", marginBottom: "1vw" }}
              type={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Modal.Footer id="er">
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    username.length < 3 ||
                    username.length > 21 ||
                    password.length < 3 ||
                    password.length > 21
                  ) {
                    showt();
                  } else if (
                    !username.length < 3 ||
                    username.length > 21 ||
                    password.length < 3 ||
                    password.length > 21
                  ) {
                    handleClose();
                    shows();
                    axios
                      .post("http://localhost:8080/api/createAccount", {
                        uid: `${idGen}`,
                        usernameReg: `${username}`,
                        passwordHashed: `${md5(password)}`,
                      })
                      .then(function (response) {
                        console.log(response);
                      });
                  }
                }}
              >
                Create Account
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      </div>
      <Alert
        show={toast}
        variant="danger"
        style={{ width: "30vw", marginLeft: "0.5vw" }}
      >
        Username and password must be between 2-20 characters.
      </Alert>

      <Alert
        show={success}
        variant="success"
        style={{ width: "30vw", marginLeft: "0.5vw" }}
      >
        Success! now login to your account
      </Alert>
    </>
  );
}

export default App;
