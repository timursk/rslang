import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import Landing from './components/welcome/Landing';
import { Routes, Route } from 'react-router-dom';
import { APP_ROUTES } from './utils/Constants';
import Textbook from './components/textbook/Textbook';
import Sprint from './pages/sprint/Sprint';
import Audiocall from './pages/audiocall/Audiocall';
import Statistics from './components/statistics/Statistics';
import SignInForm from './components/Authorisation/SignInForm';
import RegForm from './components/Authorisation/RegisterForm';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import UserContext from './store/contexts/userContext';
import { useUserReducer } from './store/hooks';
import UserChecker from './hocs/UserChecker';

function App() {
  const value = useUserReducer();

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <UserContext.Provider value={value}>
          <UserChecker>
            <Header />

            <div id="mainContainer">
              <Routes>
                <Route path={APP_ROUTES.MAIN} element={<Landing />} />
                <Route path={APP_ROUTES.SIGNIN} element={<SignInForm />} />
                <Route path={APP_ROUTES.REGFORM} element={<RegForm />} />

                <Route path={APP_ROUTES.TEXTBOOK} element={<Textbook />} />
                <Route path={`${APP_ROUTES.TEXTBOOK}/:part`} element={<Textbook />} />
                <Route path={`${APP_ROUTES.TEXTBOOK}/:part/:page`} element={<Textbook />} />

                <Route path={APP_ROUTES.SPRINT} element={<Sprint />} />
                <Route path={APP_ROUTES.AUDIOCALL} element={<Audiocall />} />
                <Route path={APP_ROUTES.STATISTICS} element={<Statistics />} />

                <Route path="*" element={<Landing />} />
              </Routes>
            </div>

            <Footer />
          </UserChecker>
        </UserContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
