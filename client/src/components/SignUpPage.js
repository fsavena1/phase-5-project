import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function SignUpPage({ setUser }) {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [signupErrors, setSignupErrors] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        user_name: userName,
        email: email,
        avatar: avatar,
        password: password,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          navigate("/")
          setUser(data);
          
        });
      } else {
        r.json().then(data => {
            setSignupErrors(Object.entries((data.errors)))
        })
      }
    });
  }

  // console.log(signupErrors)

  return (
    <div style={{ margin: "100px", width: "80%" }}>
      <h1>Create </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="firstName"
            placeholder="Enter first name..."
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>last Name</Form.Label>
          <Form.Control
            type="lastName"
            placeholder="Enter last Name..."
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUserName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="userName"
            placeholder="Enter username..."
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAvatar">
          <Form.Label>avatar url </Form.Label>
          <Form.Control
            type="Avatat"
            placeholder="Enter avatar Url..."
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Account
        </Button>
        <p>Already have an account? <a href='/'>Log in here!</a></p>
      </Form>
      {signupErrors ? (signupErrors.map(e => <div><h1 style={{ textAlign: 'center', color: 'red' }}>{e[1]}</h1></div>)
            ) : null}
            
    </div>
  );
}



export default SignUpPage;