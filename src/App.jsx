import SignIn from './components/auth/signin'
import SignUp from './components/auth/signup'
import Explore from './components/explore/explore'
import Header from './components/header/header'
import { BrowserRouter, Routes, Route } from "react-router";
import NoPage from './no-page'
import Listing from './components/listing/listing'
import React, { useEffect, useState } from 'react'
import { useAuth } from './AuthProvider';
import Footer from './components/footer/footer'
import Create from './components/forms/create';
// import './app.css'

const App = () => {
  const { isAuthenticated, user, signIn, signOut } = useAuth();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />} >
            <Route index element={<Explore />} />
            <Route path="create" element={<Create />} />
            <Route path="login" element={<SignIn />} />
            <Route path="register" element={<SignUp />} />
            <Route path=":id" element={<Listing />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
      {/* <div>app</div> */}
    </>
  )
}

export default App;
