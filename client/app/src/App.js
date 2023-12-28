import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';


import SignupPage from './pages/signup';
import HomePage from './pages/home';
import ChatPage from './pages/chatPage';
import LoginPage from './pages/login';
import { useContext } from 'react';
import { RoomContext } from './context/RoomContext';



function App() {

  const { user } = useAuthContext();
  const { room } = useContext(RoomContext);


  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/'>
          {user ? <HomePage /> : <SignupPage />}
          </Route>
          <Route path='/home'>
          {user ? <HomePage /> : <SignupPage />}
          </Route>
          <Route path='/chat'>
          {(user && room) ? <ChatPage /> : <HomePage />}
          </Route>
          <Route path='/signup'>
            <SignupPage />
          </Route>
          <Route path='/login'>
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;


