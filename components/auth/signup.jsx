import { useState } from 'react';
import axios from 'axios';
import "./auth.css"
import { useAuth } from '../../src/AuthProvider';
import { useNavigate } from 'react-router';
//const axios = require('axios'); // legacy way

// Make a request for a user with a given ID

function SignUp() {
  const { isAuthenticated, user, signIn, signOut } = useAuth();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    axios.post('/api/user/signup', inputs)
      .then(function (response) {
        console.log(response.data);
        signIn(response.data.user);
        navigate("/")
      })
      .catch((error) => {
        // handle error
        console.log(error.response.data);
      })
  }

  return (
    <div className='form-container'>
      <h3>Register!</h3>
      <form onSubmit={handleSubmit} className='auth-form'>
        <input
          type="text"
          name="username"
          value={inputs.username || ""}
          placeholder='username'
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={inputs.email || ""}
          placeholder='e-mail'
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={inputs.password || ""}
          placeholder='password'
          onChange={handleChange}
        />
        <button type="submit" className='btn'>Register!</button>
      </form>
    </div>
  )
}

export default SignUp;
