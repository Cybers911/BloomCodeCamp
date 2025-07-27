import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import LearnerDashboard from './pages/LearnerDashboard';
import ReviewerDashboard from './pages/ReviewerDashboard';

const App = () => (
  <AuthProvider>
    <Router>
      <Switch>
        <Route path="/" component={Index} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/learner-dashboard" component={LearnerDashboard} />
        <Route path="/reviewer-dashboard" component={ReviewerDashboard} />
        <Redirect to="/" />
      </Switch>
    </Router>
  </AuthProvider>
);

export default App; 