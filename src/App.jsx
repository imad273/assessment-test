import { Routes, Route } from "react-router-dom";
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Dashboard from './Components/Dashboard';
import './Styles/main.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;