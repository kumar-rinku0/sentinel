import { useState } from 'react';
import axios from 'axios';
import "./auth.css"
import { useAuth } from '../../AuthProvider';
import { useNavigate } from 'react-router';
import { useMsg } from "../alert/alert-provider"
//const axios = require('axios'); // legacy way

// Make a request for a user with a given ID

function SignUp() {
  const { setAlert } = useMsg();
  const { isAuthenticated, user, signIn, signOut } = useAuth();
  const navigate = useNavigate();
  const [disableBtn, setDisableBtn] = useState(false);
  const [inputs, setInputs] = useState({});
  let msg = null;
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    setDisableBtn(true);
    event.preventDefault();
    console.log(inputs);
    axios.post('/api/user/signup', inputs)
      .then(function (response) {
        const user = response.data.user;
        signIn(user);
        setAlert([`hi ${user.username} welcome to sentinel.`, "success", true]);
        navigate('/');
      })
      .catch((error) => {
        // handle error
        msg = error.response.data.msg || "server error!";
        setAlert([msg, "error", true]);
        console.log(msg);
        setDisableBtn(false);
      })
  }

  return (
    <div className='register'>
      <div className='form-container'>
        <h3>Register!</h3>
        <form onSubmit={handleSubmit} className='auth-form'>
          <input
            type="text"
            name="username"
            value={inputs.username || ""}
            placeholder='username'
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            value={inputs.email || ""}
            placeholder='e-mail'
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            value={inputs.password || ""}
            placeholder='password'
            onChange={handleChange}
            required
          />
          <button type="submit" className='btn' disabled={isAuthenticated || disableBtn}>Register!</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp;
