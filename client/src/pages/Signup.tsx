import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { useState } from "react";
import dispatchToastEvent from "../lib/toasts/events";
import axios from "axios";
import backend_url from "../data/backend_url";

export default function Signup() {
	const navigate = useNavigate();
	const [disabled, setDisabled] = useState<boolean>(false);
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setDisabled(true);
		if (password !== confirmPassword) {
			dispatchToastEvent({
				message: "Passwords do not match",
				type: "error",
			});

			setDisabled(false);
			return;
		}

		axios
			.post(`${backend_url}/auth/signup`, { username, password }, { withCredentials: true })
			.then((res) => {
				dispatchToastEvent({
					message: res.data.message,
					type: res.data.success ? "success" : "error",
				});

				navigate("/dashboard");
			})
			.catch((err) => {
				dispatchToastEvent({
					message: err.response.data.message || String(err),
					type: "error",
				});
			});

		setDisabled(false);
	}

	return (
		<div className="flex items-center justify-center w-full h-[100dvh]">
			<div className="p-10 flex-col bg-gray-200 rounded">
				<h1 className="text-4xl mb-5">Signup</h1>

				<form className="flex flex-col gap-2" onSubmit={handleSubmit}>
					<div className="flex flex-col">
						<label htmlFor="username">Username:</label>
						<input
							type="text"
							name="username"
							placeholder="Username"
							className="px-4 py-2 rounded mt-1"
							value={username}
							required
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="flex flex-col">
						<PasswordInput
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="password">Confirm Password:</label>
						<input
							type="password"
							name="password"
							placeholder="Password"
							className="px-4 py-2 rounded mt-1"
							value={confirmPassword}
							required
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
					<button
						type="submit"
						className="px-3 py-2 bg-blue-500 text-white rounded mt-5"
						disabled={disabled}
					>
						Signup
					</button>
					<div className="flex justify-end text-blue-700">
						<Link to="/login">Login</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
