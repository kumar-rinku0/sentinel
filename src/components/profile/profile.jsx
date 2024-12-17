import React from 'react'
import { useAuth } from '../../AuthProvider';

const Profile = () => {
  const { isAuthenticated, user } = useAuth();
  const renderForm = () => {
    console.log("form randered!");
  }
  return (
    <div>
      {isAuthenticated && (user.username)}
      <button type="button" onClick={renderForm} >Update Username!</button>
    </div>
  )
}

export default Profile;