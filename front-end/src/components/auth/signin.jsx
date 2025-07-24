import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useAuth } from '../../AuthProvider';
import "./auth.css";
import { useMsg } from '../alert/alert-provider';
import { authorizeUrl } from './google-auth';



const SignIn = () => {
  const { setAlert } = useMsg();
  const { isAuthenticated, user, signIn, signOut } = useAuth();
  const navigate = useNavigate();
  const [disableBtn, setDisableBtn] = useState(false);
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    setDisableBtn(true);
    event.preventDefault();
    console.log(inputs);
    axios.post('/api/user/signin', inputs)
      .then(function (response) {
        console.log(response.data);
        const user = response.data.user;
        signIn(user);
        setAlert([`hi ${user.username} welcome to sentinel.`, "success", true]);
        navigate('/');
      })
      .catch((error) => {
        // handle error
        console.error(error.response.data);
        const { msg, type } = error.response.data;
        setAlert([msg, type, true]);
        setDisableBtn(false);
      })
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate])

  return (
    <div className='login'>
      <div className='form-container'>
        <div className='heading'>Login!</div>
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
            type="password"
            name="password"
            value={inputs.password || ""}
            placeholder='password'
            onChange={handleChange}
            required
          />

          <button type="submit" className='btn' disabled={isAuthenticated || disableBtn}>Sign IN</button>
        </form>
        <div>or</div>
        <div className='google-login'>
          <button className='google-btn' onClick={() => window.location.href = authorizeUrl} disabled={isAuthenticated || disableBtn}>Sign in with Google</button>
        </div>
      </div>
    </div>
  )
}

export default SignIn;
