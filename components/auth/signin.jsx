import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useAuth } from '../../src/AuthProvider';
import "./auth.css";



const SignIn = () => {
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
    axios.post('/api/user/signin', inputs)
      .then(function (response) {
        console.log(response.data);
        signIn(response.data.user);
        navigate('/');
      })
      .catch((error) => {
        // handle error
        console.log(error.response.data);
      })
  }

  return (
    <div className='form-container'>
      <h3>Login!</h3>
      <form onSubmit={handleSubmit} className='auth-form'>
        <input
          type="text"
          name="username"
          value={inputs.username || ""}
          placeholder='username'
          onChange={handleChange}
        />


        <input
          type="password"
          name="password"
          value={inputs.password || ""}
          placeholder='password'
          onChange={handleChange}
        />

        <button type="submit" className='btn'>Sign IN</button>
      </form>
    </div>
  )
}

export default SignIn;
