import { useState } from 'react';
import axios from 'axios';
import "./auth.css";


const SignIn = () => {
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
      })
      .catch(function (error) {
        // handle error
        console.log(error);
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
