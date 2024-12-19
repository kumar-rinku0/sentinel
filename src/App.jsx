import SignIn from './components/auth/signin'
import SignUp from './components/auth/signup'
import Explore from './components/explore/explore'
import Header from './components/header/header'
import MyListing from './components/explore/my-listing'
import Profile from './components/profile/profile'
import { Routes, Route } from "react-router";
import NoPage from './no-page'
import Listing from './components/listing/listing'
import React from 'react'
import { useAuth } from './AuthProvider';
import Footer from './components/footer/footer'
import Create from './components/forms/create';
// import './app.css'

const App = () => {
  const { isAuthenticated, user } = useAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />} >
          <Route index element={<Explore />} />
          <Route path="login" element={<SignIn />} />
          <Route path="register" element={<SignUp />} />
          {isAuthenticated && (
            <>
              <Route path="mylisting" element={<MyListing />} />
              <Route path={`${user.username}`} element={<Profile />} />
              <Route path="create" element={<Create />} />
            </>
          )}
          <Route path="listing/:id" element={<Listing />} />
          <Route path="listing/:id/edit" element={<Create />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      <Footer />
      {/* <div>app</div> */}
    </>
  )
}

export default App;
