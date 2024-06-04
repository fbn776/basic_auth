import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="signup" element={<Signup />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="*" element={<Home />} />
			</Routes>
		</>
	);
}

export default App;
