import { Link } from "react-router-dom";
import { PasswordInput } from "../components/PasswordInput";
import { useState } from "react";

export default function Signup() {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");


	return (
		<div className="flex items-center justify-center w-full h-[100dvh]">
			<div className="p-10 flex-col bg-gray-200 rounded">
				<h1 className="text-4xl mb-5">Signup</h1>
				<form className="flex flex-col gap-2">
					<div className="flex flex-col">
						<label htmlFor="username">Username:</label>
						<input
							type="text"
							name="username"
							placeholder="Username"
							className="px-4 py-2 rounded mt-1"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="flex flex-col">
						<PasswordInput value={password} onChange={e => setPassword(e.target.value)} />
					</div>
					<div className="flex flex-col">
						<label htmlFor="password">Confirm Password:</label>
						<input
							type="password"
							name="password"
							placeholder="Password"
							className="px-4 py-2 rounded mt-1"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
					<button
						type="submit"
						className="px-3 py-2 bg-blue-500 text-white rounded mt-5"
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
