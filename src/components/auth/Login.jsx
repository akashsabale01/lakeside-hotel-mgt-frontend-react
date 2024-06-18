import { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({ login }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("email: ", email);
        console.log("password: ", password);

        try {
            await login(email, password);
            navigate("/");
        } catch (error) {
            console.error("Error while Login: ", error);
            navigate("/login");
            toast.error("Login Failed");
        }
    };

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh"
        }}>
            <Card style={{ width: '25rem', padding: "20px" }}>
                <h2 className='text-center'>Login</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Button variant="primary" className='w-100 text-center mt-3' type="submit">
                        Login
                    </Button>
                </Form>
                <p className='mt-3'>Don't have an account yet? <Link to={"/register"}>Register</Link> </p>
            </Card>


        </div>
    )
}


export default Login;