import { useRouter } from "next/router";
import { CircleWavyWarning } from "phosphor-react";
import { Layout } from "src/components/layouts/Layout";
import { Button } from "src/components/ui/Button";

export default function Error() {
  const router = useRouter();

  return (
    <Layout title="404" desc="Page not found">
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="flex flex-col items-center justify-center space-y-2">
          <CircleWavyWarning size={120} weight="bold" className="text-dark-500" />
          <div className="text-4xl font-bold text-secondary">Oops, Something went wrong</div>
          <Button onClick={() => router.push("/")}>Go Back To Home</Button>
        </div>
      </div>
    </Layout>
  );
}
