import { useEffect, useRef, useState } from "react";
import "./style.css";
import { ToastEventDetail } from "./events";

export default function ToastContainer() {
	const [toastsArr, setToastsArr] = useState<ToastEventDetail[]>([]);

	useEffect(() => {
		const addEvent = (e: Event) => {
			(e as CustomEvent<ToastEventDetail>).detail.key =
				Date.now() + Math.floor(Math.random() * 1000);

			setToastsArr((prev) => {
				return [
					...prev.slice(prev.length - 10),
					(e as CustomEvent<ToastEventDetail>).detail,
				];
			});
		};

		document.addEventListener("show-toast", addEvent);

		return () => {
			document.removeEventListener("show-toast", addEvent);
		};
	}, []);

	return (
		<>
			{toastsArr.map((toast, index) => {
				return <Toast data={toast} key={toast.key || index} posFromBottom={mapToRange(index, 0, 4, 0, 2.5)}/>;
			})}
		</>
	);
}

function mapToRange(value: number, x1: number, y1: number, x2: number, y2: number) {
	return ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
}

function Toast({
	data,
	onClose,
	posFromBottom = 2.5, // 2.5rem
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

	return (
		<div className={`toast ${data.type}`} style={{
			bottom: `${posFromBottom}rem`,
		}} ref={elm}>
			<div className="mr-4">{data.message}</div>
			<button
				className="aspect-square h-[80%] border-l-2 border-white border-opacity-10"
				onClick={() => {
					elm.current?.classList.remove("show");
					onClose?.();
				}}
			>
				X
			</button>
		</div>
	);
}
