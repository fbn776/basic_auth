import { useState } from "react";

export default function PasswordInput({ value, onChange }: { value?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
	const [passwordVisibility, setPasswordVisibility] = useState<
		"password" | "text"
	>("password");
	return (
		<>
			<label htmlFor="password">Password:</label>

			<div>
				<input
					type={passwordVisibility}
					name="password"
					placeholder="Password"
					className="px-4 py-2 rounded-l mt-1"
					value={value || ''}
					required
					onChange={onChange}
				/>
				<button
					className="px-1 bg-gray-500 text-white h-full py-2 w-[50px] rounded-r"
					onClick={(e) => {
						e.preventDefault();
						setPasswordVisibility(
							passwordVisibility === "password" ? "text" : "password"
						);
					}}
				>
					{passwordVisibility === "password" ? "Show" : "Hide"}
				</button>
			</div>
		</>
	);
}
