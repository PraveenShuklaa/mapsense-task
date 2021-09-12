import { Switch, Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router basename='/'>
      <Switch>
        <Route path='/' component={Login} exact />
        <ProtectedRoute path='/dashboard' component={Dashboard} exact />
      </Switch>
    </Router>
  );
}

export default App;
