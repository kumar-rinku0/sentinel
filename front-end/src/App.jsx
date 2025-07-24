import SignIn from './components/auth/signin'
import SignUp from './components/auth/signup'
import Explore from './components/explore/explore'
import Header from './components/header/header'
import MyListing from './components/explore/my-listing'
import Profile from './components/profile/profile'
import PrivacyPolicy from './components/footer/privacy-policy'
import TermsConditions from './components/footer/terms-conditions'
import NoPage from './no-page'
import { Routes, Route } from "react-router";
import Listing from './components/listing/listing'
import { useAuth } from './AuthProvider';
import Footer from './components/footer/footer'
import Create from './components/forms/create';
import { FaReact } from 'react-icons/fa6'
import './App.css'
import Auth from './components/auth/auth'

const App = () => {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) {
    return (
      <div className='app'>
        <FaReact size="4rem" />
      </div>
    )
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />} >
          <Route index element={<Explore />} />
          <Route path="login" element={<SignIn />} />
          <Route path="register" element={<SignUp />} />
          <Route path="auth/google/callback" element={<Auth />} />
          {isAuthenticated && (
            <>
              <Route path="mylisting" element={<MyListing />} />
              <Route path={`${user.username}`} element={<Profile />} />
              <Route path="create" element={<Create />} />
            </>
          )}
          <Route path="listing/:id" element={<Listing />} />
          <Route path="listing/:id/edit" element={<Create />} />
          <Route path="terms" element={<TermsConditions />} />
          <Route path="policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App;

// app updated.
