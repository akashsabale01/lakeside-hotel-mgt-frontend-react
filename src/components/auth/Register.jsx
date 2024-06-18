import { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Register = ({ register }) => {

    const [userRegistrationData, setUserRegistrationData] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("userRegistrationData: ", userRegistrationData);

        try {
            await register(userRegistrationData.name, userRegistrationData.email, userRegistrationData.password, userRegistrationData.address, userRegistrationData.phone);

            navigate("/login");
        } catch (error) {
            console.error("Error while registration: ", error);
        }
    };

    const handleChange = (e) => {
        setUserRegistrationData({ ...userRegistrationData, [e.target.name]: e.target.value });
      };

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop:"2rem"
        }}>
            <Card style={{ width: '25rem', padding: "20px" }}>
                <h2 className='text-center'>Register</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={userRegistrationData.name}
                             onChange={handleChange} name='name'/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={userRegistrationData.email}
                             onChange={handleChange} name='email'/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={userRegistrationData.password}
                             onChange={handleChange} name='password'/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" value={userRegistrationData.address}
                             onChange={handleChange} name='address'/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" value={userRegistrationData.phone}
                             onChange={handleChange} name='phone'/>
                    </Form.Group>

                    <Button variant="primary" className='w-100 text-center mt-3' type="submit">
                        Register
                    </Button>
                </Form>
                <p className='mt-3'>Already have an account yet? <Link to={"/login"}>Login</Link> </p>
            </Card>
        </div>
    )
}

export default Register;