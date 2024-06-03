import { Link } from "react-router-dom";
import dispatchToastEvent from "../lib/toasts/events";

export default function Home() {
	return (
		<div className="w-full h-full flex items-center justify-center flex-col p-10 gap-10">
			<h1 className="text-4xl">Home</h1>
			<Link to="/login">
				<button className="px-3 py-2 bg-gray-600 text-white rounded">
					Login
				</button>
			</Link>
			<Link to="/signup">
				<button className="px-3 py-2 bg-gray-600 text-white rounded">
					Signup
				</button>
			</Link>

			<button
				onClick={() => {
					dispatchToastEvent({
						type: "success",
						message: "Hello, World!",
						duration: 5000,
					});
				}}
			>
				Success
			</button>

			<button
				onClick={() => {
					dispatchToastEvent({
						type: "error",
						message: "Hello, World!",
						duration: 5000,
					});
				}}
			>
				Error
			</button>

			<button
				onClick={() => {
					dispatchToastEvent({
						type: "warning",
						message: "Hello, World!",
						duration: 5000,
					});
				}}
			>
				Warning
			</button>

			<button
				onClick={() => {
					dispatchToastEvent({
						type: "info",
						message: "Invalid email or password.",
						duration: 5000,
					});
				}}
			>
				Info
			</button>
		</div>
	);
}
