import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import SignIn from '../components/auth/signin'
import SignUp from '../components/auth/signup'
import Listings from '../components/explore/listings'
import Layout from './layout'
import { BrowserRouter, Routes, Route } from "react-router";
import NoPage from './no-page'
import Listing from '../components/listing/listing'
// import './app.css'

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Listings />} />
            <Route path="login" element={<SignIn />} />
            <Route path="register" element={<SignUp />} />
            <Route path=":id" element={<Listing />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <div>app</div> */}
    </>
  )
}

export default App;
