import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Accounting from './pages/Accounting';
import Analysis from './pages/Analysis';
import AIAccounting from './pages/AIAccounting';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/accounting" element={<Accounting />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/ai-accounting" element={<AIAccounting />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
