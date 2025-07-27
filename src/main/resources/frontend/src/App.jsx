import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './guards/ProtectedRoute';
import PublicRoute from './guards/PublicRoute';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LearnerDashboard from './pages/LearnerDashboard';
import ReviewerDashboard from './pages/ReviewerDashboard';

const App = () => (
  <AuthProvider>
    <Router>
      <Switch>
        {/* Public routes - redirect authenticated users to dashboard */}
        <Route path="/" exact>
          <PublicRoute>
            <Index />
          </PublicRoute>
        </Route>
        <Route path="/login">
          <PublicRoute>
            <Login />
          </PublicRoute>
        </Route>
        <Route path="/register">
          <PublicRoute>
            <Register />
          </PublicRoute>
        </Route>
        
        {/* Protected routes - require authentication */}
        <Route path="/dashboard">
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </Route>
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