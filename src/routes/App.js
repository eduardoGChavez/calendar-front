import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout';
import Home from '../containers/Home';
import Login from '../containers/Login';
import Events from '../containers/Events';
import UserContext from '../context/UserContext';
import useUserState from '../hooks/useUserState'; 
import { useState, useEffect } from 'react';
// import AppContext from '../context/AppContex';

const App = () => {
  const userState = useUserState();
  const [userData, setUserData] = useState();

  const handleSetUser = (payload) => {
    setUserData(payload)
  }

  return (
    <div className="App">
      <UserContext.Provider value={userState}>
          <BrowserRouter>
              <Layout>
                  <Routes>
                      <Route exact path="/" element={<Home userData={userData}/>} />
                      <Route exact path="/login" element={<Login userData={userData} setUserData={setUserData}/>} />
                      <Route exact path="/events" element={<Events />} />
                      {/* <Route exact path="/checkout" element={<Checkout />} />
                      <Route exact path="/checkout/information" element={<Information />} />
                      <Route exact path="/checkout/payment" element={<Payment />} />
                      <Route exact path="/checkout/success" element={<Success />} />
                      <Route path='*' element={<NotFound />} /> */}
                  </Routes>
              </Layout>
          </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
