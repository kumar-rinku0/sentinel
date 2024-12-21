import "./profile.css"

import React, { useState } from 'react'
import { useAuth } from '../../AuthProvider';
import { useMsg } from "../alert/alert-provider";
import { useNavigate } from "react-router";
import axios from "axios";

import { Button } from "@mui/material"
import TextField from '@mui/material/TextField';

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
    if (event.target.length === 2) {
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
      <div className="profile-forms-container">

        {!isVisible.username ? (
          <div className="update-username">
            {user.username}
            <Button type="button" onClick={() => renderForm("username", true)} >Update Username!</Button>
          </div>
        ) : (
          <div className="update-username-form">
            <form onSubmit={handleOnsubmit} className="form">
              <TextField type="text" label="new username!" variant="standard" size="small" name='username' value={inputs.username || ""} onChange={handleChange} required />
              <div className="flex-row">
                <Button type="button" variant="outlined" onClick={() => renderForm("username", false)} >cencel</Button>
                <Button type='submit' variant="outlined" >save!</Button>
              </div>
            </form>
          </div>
        )}

        {!isVisible.password ? (
          <div className="change-password">
            <Button type="button" onClick={() => renderForm("password", true)} >Change Password!</Button>
          </div>
        ) : (
          <div className="">
            <form onSubmit={handleOnsubmit} className="form">
              <TextField type="password" label="old password" variant="standard" name='oldpassword' value={inputs.oldpassword || ""} onChange={handleChange} required />
              <TextField type="password" label="new password" variant="standard" name='newpassword' value={inputs.newpassword || ""} onChange={handleChange} required />
              <div className="flex-row">
                <Button type="button" variant="outlined" onClick={() => renderForm("password", false)} >cencel</Button>
                <Button type='submit' variant="outlined">save!</Button>
              </div>
            </form>
          </div>
        )}
        <div>
          <form onSubmit={handleOnsubmit} className="form">
            <div className="delelte-check">
              <input type="checkbox" name="isAgree" id="isAgree" required />
              <label htmlFor="isAgree" className="text-sm">deleting account will delete your created listings!</label>
            </div>
            <Button type="submit" variant="outlined" className="red" >DELETE ACCOUNT</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile;