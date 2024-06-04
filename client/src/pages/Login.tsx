import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { useState } from "react";
import backend_url from "../data/backend_url";
import axios from "axios";
import dispatchToastEvent from "../lib/toasts/events";


export default function Login() {
	const navigate = useNavigate();
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		axios.post(`${backend_url}/auth/login`, { username, password }, { withCredentials: true })
		.then(res => {
			console.log(res.data);
			dispatchToastEvent({
				message: res.data.message,
				type: "success"
			});
			setTimeout(() => navigate("/dashboard"), 1000);
			// navigate("/dashboard");
		})
		.catch(err => {
			console.error(err);
			dispatchToastEvent({
				message: err.response.data.message || String(err),
				type: "error",
			})

		})
	}

	return (
		<div className="flex items-center justify-center w-full h-[100dvh]">
			<div className="p-10 flex-col bg-gray-200 rounded">
				<h1 className="text-4xl mb-5">Login</h1>
				<form className="flex flex-col gap-2" onSubmit={handleSubmit}>
					<div className="flex flex-col">
						<label htmlFor="username">Username:</label>
						<input
							type="text"
							name="username"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							className="px-4 py-2 rounded mt-1"
						/>
					</div>
					<div className="flex flex-col">
						<PasswordInput value={password} onChange={e => setPassword(e.target.value)}/>
					</div>
					<button
						type="submit"
						className="px-3 py-2 bg-blue-500 text-white rounded mt-5"
					>
						Login
					</button>
					<div className="flex justify-end text-blue-700">
						<Link to="/signup">Signup</Link>
					</div>
				</form>
			</div>
		</div>
	);
}