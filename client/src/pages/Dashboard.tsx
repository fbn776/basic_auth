import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dispatchToastEvent from "../lib/toasts/events";
import backend_url from "../data/backend_url";
import Cookies from "js-cookie";


export default function Dashboard() {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [cookies, setCookies] = useState(Cookies.get("token"));
	
	
	useEffect(() => {
		const verifyCookie = async () => {
			setCookies(Cookies.get("token"));

			console.log("Cookies: ", cookies);

			if (!cookies) {
				navigate("/login");
			}

			const { data } = await axios.post(
				`${backend_url}/auth`,
				{},
				{ withCredentials: true }
			);

			const { status, user } = data;
			setUsername(user);

			return status
				? dispatchToastEvent({
						message: `Welcome ${user}`,
						type: "success",
					})
				: (Cookies.remove("token"), setCookies(""), navigate("/login"));
		};
		verifyCookie();
	}, [ cookies, navigate ]);

	return (
		<section>
			<header className="fixed top-0 left-0 w-full h-[60px] bg-blue-800 shadow-md flex items-center px-2">
				<h1 className="text-2xl text-white truncate max-w-[200px]">
					{username}
				</h1>
				<button
					className="ml-auto px-3 py-1 bg-red-500 text-white rounded"
					onClick={() => {
						Cookies.remove("token");
						navigate("/login");
					}}
				>
					Logout
				</button>
			</header>
		</section>
	);
}
