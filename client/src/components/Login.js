import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function LoginPage({ onLogin }) {
    const [loginUser, setLoginUser] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [loginErrors, setLoginErrors] = useState('')

    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_name: loginUser,
                password: loginPassword
            })
        })
            .then(r => {
                if (r.ok) {
                    r.json().then(user => {
                        navigate(`/`)
                        onLogin(user)
                        console.log(user)
                    })
                } else {
                    r.json().then(data => setLoginErrors(data.error))
                }
            })
    }

    // if (loginErrors) return <h1 style={{margin: '100px auto 0 auto', textAlign: 'center', color: 'red'}}>{loginErrors}</h1>
    return (
        <div style={{ margin: '100px', width: '80%' }}>
            <h1></h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUserName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username..."
                        value={loginUser}
                        onChange={e => setLoginUser(e.target.value)}

                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                    />

                </Form.Group>
                <Button variant="primary" type="submit">
                    Log In
                </Button>
                <p>Don't have an account yet? <a href='/signup'>Create account here!</a></p>
            </Form>
            {loginErrors &&
                <div>
                    <h1 style={{ margin: '100px auto 0 auto', textAlign: 'center', color: 'red' }}>{loginErrors}</h1>
                </div>}
        </div>
    )
}

export default LoginPage