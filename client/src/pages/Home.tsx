import { Link } from "react-router-dom";

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
		</div>
	);
}
