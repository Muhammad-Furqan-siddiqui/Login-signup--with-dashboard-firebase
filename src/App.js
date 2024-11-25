import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import LoginForm from "./pages/LoginForm";
import Dashboard from "./pages/Dashboard";
import Users from "./commponents/Users";
import Comments from "./commponents/Comments";
import Albums from "./commponents/Albums";
import Photos from "./commponents/Photos";
import Posts from "./commponents/Posts";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/loginForm" element={<LoginForm />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/comments" element={<Comments />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/posts" element={<Posts />} />
      </Routes>
    </Router>
  );
}

export default App;
