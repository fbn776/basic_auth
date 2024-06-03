import { useEffect, useRef, useState } from "react";
import "./style.css";
import { ToastEventDetail } from "./events";
import { mapToRange } from "../utils";

const MAX_TOASTS = 10;

export default function ToastContainer() {
	const [toastsArr, setToastsArr] = useState<ToastEventDetail[]>([]);

	useEffect(() => {
		const addEvent = (e: Event) => {
			(e as CustomEvent<ToastEventDetail>).detail.key =
				Date.now() + Math.floor(Math.random() * 1000);

			setToastsArr((prev) => {
				return [
					...prev.slice(prev.length - MAX_TOASTS),
					(e as CustomEvent<ToastEventDetail>).detail,
				];
			});
		};

		document.addEventListener("show-toast", addEvent);

		return () => {
			document.removeEventListener("show-toast", addEvent);
		};
	}, []);

	let i = 0;
	return (
		<>
			{toastsArr.map((toast, index) => {
				return <Toast data={toast} key={toast.key || index} posFromBottom={mapToRange(++i, 0, toastsArr.length, 0, 2.5)}/>;
			})}
		</>
	);
}

function Toast({
	data,
	onClose,
	posFromBottom, // 2.5rem
}: {
	data: ToastEventDetail;
	onClose?: () => void;
	posFromBottom?: number;
}) {
	const elm = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const showTimer = setTimeout(() => {
			elm.current?.classList.add("show");
		}, 0);

		const deleteTimer = setTimeout(() => {
			elm.current?.classList.remove("show");
			onClose?.();
		}, data.duration || 5000);

		return () => {
			clearTimeout(showTimer);
			clearTimeout(deleteTimer);
		};
	}, []);

console.log(Date.now(), posFromBottom);

	return (
		<div
			className={`toast ${data.type}`}
			ref={elm}
			style={{
				bottom: `${posFromBottom}rem`,
			}}
		>
			<div className="px-2 text-ellipsis text-nowrap whitespace-nowrap overflow-hidden">
				{data.message}
			</div>
			<button
				className="h-[100%] px-2 border-l-2 border-white border-opacity-10"
				onClick={() => {
					elm.current?.classList.remove("show");
					onClose?.();
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M18 6l-12 12" />
					<path d="M6 6l12 12" />
				</svg>
			</button>
		</div>
	);
}