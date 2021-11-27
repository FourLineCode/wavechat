import { useRouter } from "next/router";
import { FaWindowClose } from "react-icons/fa";
import { Layout } from "src/components/layouts/Layout";
import { Button } from "src/components/ui/Button";

export default function NotFound() {
	const router = useRouter();

	return (
		<Layout title="404" desc="Page not found">
			<div className="flex items-center justify-center w-screen h-screen">
				<div className="flex flex-col items-center justify-center space-y-2">
					<FaWindowClose size="96" className="text-dark-500" />
					<div className="text-4xl font-bold text-secondary">Page Not Found</div>
					<Button onClick={() => router.push("/")}>Go Back To Home</Button>
				</div>
			</div>
		</Layout>
	);
}
