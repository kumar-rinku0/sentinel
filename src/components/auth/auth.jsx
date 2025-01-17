import axios from 'axios';
import { getToken } from './google-auth';
import { useAuth } from '../../AuthProvider';
import { useMsg } from '../alert/alert-provider';
import { useNavigate } from 'react-router';
import React, { useEffect } from 'react'

const Auth = ({ }) => {
  let params = new URLSearchParams(document.location.search);
  let code = params.get("code");
  let error = params.get("error");
  const { setAlert } = useMsg();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  console.log(code);
  useEffect(() => {
    if (code) {
      (async () => {
        console.log("Auth loading....")
        const tokens = await getToken(code);
        axios.post('/api/user/auth/google/callback', tokens)
          .then((response) => {
            console.log(response.data);
            const user = response.data.user;
            signIn(user);
            setAlert([`hi ${user.username} welcome to sentinel.`, "success", true]);
            navigate('/');
          })
          .catch((error) => {
            console.error(error.response.data);
            const { msg, type } = error.response.data;
            setAlert([msg, type, true]);
          });
      })();
    }
    if (error) {
      setAlert([error, "error", true]);
      navigate('/login');
    }
    return () => {
      console.log("Auth unmounting....")
    }

  }, [code, error]);
  return (
    <div className='auth'>
      <div className='auth-container'>
        <p>Authenticating...</p>
      </div>
    </div>
  )
}

export default Auth;