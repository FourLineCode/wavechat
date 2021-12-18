export function LayoutWarning() {
	return (
		<div className="fixed left-0 z-50 right-0 flex justify-center px-2 bottom-10 md:hidden">
			<div className="p-4 font-bold text-center text-red-500 bg-yellow-400 border-2 border-red-500 rounded-lg shadow-lg bg-opacity-95 max-w-max">
				This app is not optimized for your device
			</div>
		</div>
	);
}
