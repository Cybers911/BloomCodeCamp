import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import LearnerDashboard from './pages/LearnerDashboard';
import ReviewerDashboard from './pages/ReviewerDashboard';

const App = () => (
  <AuthProvider>
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/learner-dashboard" component={LearnerDashboard} />
        <Route path="/reviewer-dashboard" component={ReviewerDashboard} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  </AuthProvider>
);

export default App; 