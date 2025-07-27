import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './guards/ProtectedRoute';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import LearnerDashboard from './pages/LearnerDashboard';
import ReviewerDashboard from './pages/ReviewerDashboard';

const App = () => (
  <AuthProvider>
    <Router>
      <Switch>
        {/* Public routes - accessible without authentication */}
        <Route path="/" component={Index} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        
        {/* Protected routes - require authentication */}
        <Route path="/learner-dashboard">
          <ProtectedRoute>
            <LearnerDashboard />
          </ProtectedRoute>
        </Route>
        <Route path="/reviewer-dashboard">
          <ProtectedRoute>
            <ReviewerDashboard />
          </ProtectedRoute>
        </Route>
        
        {/* Redirect any other routes to login */}
        <Redirect to="/login" />
      </Switch>
    </Router>
  </AuthProvider>
);

export default App; 