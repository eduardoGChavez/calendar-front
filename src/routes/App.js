// import logo from './logo.svg';
import './App.css';
// import ShowBlogs from '../blog/ShowBlogs';
// import CreateBlog from '../blog/CreateBlog';
// import EditBlog from '../blog/EditBlog';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout';
import Home from '../containers/Home';
import Login from '../containers/Login';
import Events from '../containers/Events';
// import AppContext from '../context/AppContex';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
        {/* <AppContext.Provider value={initialState}> */}
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/events" element={<Events />} />
                        {/* <Route exact path="/checkout" element={<Checkout />} />
                        <Route exact path="/checkout/information" element={<Information />} />
                        <Route exact path="/checkout/payment" element={<Payment />} />
                        <Route exact path="/checkout/success" element={<Success />} />
                        <Route path='*' element={<NotFound />} /> */}
                    </Routes>
                </Layout>
            </BrowserRouter>
        {/* </AppContext.Provider> */}
    </div>
  );
}

export default App;
