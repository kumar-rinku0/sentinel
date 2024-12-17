import "./profile.css"

import React, { useState } from 'react'
import { useAuth } from '../../AuthProvider';
import { useMsg } from "../alert/alert-provider";
import { useNavigate } from "react-router";
import axios from "axios";

const Profile = () => {
  const { isAuthenticated, user, signIn, signOut } = useAuth();
  const { setAlert } = useMsg();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [isVisible, setIsVisible] = useState({ username: false, password: false });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  }
  const handleOnsubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    if (event.target.length === 3) {
      axios.patch("/api/user/account", data).then((res) => {
        console.log(res.data);
        const { msg, type, updatedUser } = res.data;
        setAlert([msg, type, true]);
        // setIsVisible((values) => ({ ...values, ["username"]: false }));
        signIn(updatedUser);
        navigate(`/${updatedUser.username}`);
      }).catch((error) => {
        const { msg, type } = error.response.data;
        setAlert([msg, type, true]);
      })
    }
    if (event.target.length === 4) {
      axios.put("/api/user/account", data).then((res) => {
        console.log(res.data);
        const { msg, type } = res.data;
        setAlert([msg, type, true]);
        setIsVisible((values) => ({ ...values, ["password"]: false }));
        setInputs("");
      }).catch((error) => {
        const { msg, type } = error.response.data;
        setAlert([msg, type, true]);
      })
    }
  }
  const handleDestroyAccount = () => {
    axios.delete("/api/user/destroy").then((res) => {
      console.log(res.data);
      const { msg, type } = res.data;
      setAlert([msg, type, true]);
      signOut();
      navigate("/");
    }).then((err) => {
      console.log(err.response.data);
      const { msg, type } = err.response.data;
      setAlert([msg, type, true]);
    })
  }
  const renderForm = (id, toSet) => {
    setIsVisible((values) => ({ ...values, [id]: toSet }));
    if (isAuthenticated && id === "username") {
      setInputs((values) => ({ ...values, [id]: user.username }));
    }
  }
  if (!isAuthenticated) {
    return (
      <div className='profile'>
        Not Authorized!
      </div>
    )
  }
  return (
    <div className='profile'>
      {!isVisible.username ? (
        <div>
          {user.username}
          <button type="button" onClick={() => renderForm("username", true)} >Update Username!</button>
        </div>
      ) : (
        <div>
          <form onSubmit={handleOnsubmit}>
            <input type="text" name='username' value={inputs.username || ""} onChange={handleChange} required />
            <button type="button" onClick={() => renderForm("username", false)} >cencel</button>
            <button type='submit' >save!</button>
          </form>
        </div>
      )}

      {!isVisible.password ? (
        <div>
          <button type="button" onClick={() => renderForm("password", true)} >Change Password!</button>
        </div>
      ) : (
        <div>
          <form onSubmit={handleOnsubmit}>
            <input type="password" name='oldpassword' value={inputs.oldpassword || ""} onChange={handleChange} required />
            <input type="password" name='newpassword' value={inputs.newpassword || ""} onChange={handleChange} required />
            <button type="button" onClick={() => renderForm("password", false)} >cencel</button>
            <button type='submit' >save!</button>
          </form>
        </div>
      )}
      <div>
        <button type="button" onClick={handleDestroyAccount} >DELETE ACCOUNT</button>
      </div>
    </div>
  )
}

export default Profile;