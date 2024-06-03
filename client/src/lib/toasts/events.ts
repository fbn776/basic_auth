export interface ToastEventDetail {
	type: "success" | "error" | "warning" | "info";
	message: string;
	duration?: number;
	key?: number;
}

export default function dispatchToastEvent(detail: ToastEventDetail) {
	document.dispatchEvent(
		new CustomEvent<ToastEventDetail>("show-toast", { detail })
	);
}
