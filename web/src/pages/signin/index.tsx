import clsx from "clsx";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Layout } from "src/components/layouts/Layout";
import { NavBar } from "src/components/layouts/NavBar";
import { Button } from "src/components/ui/Button";
import { Card } from "src/components/ui/Card";
import { Input } from "src/components/ui/Input";
import { Spinner } from "src/components/ui/Spinner";
import { useAuth } from "src/store/useAuth";

export default function SignIn() {
    const auth = useAuth();
    const router = useRouter();
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
        if (Boolean(router.query.redirect)) {
            toast.error("Please sign in to view this page");
        }
    }, [router.query]);

    useEffect(() => {
        return () => {
            setRedirecting(false);
        };
    }, []);

    return (
        <Layout title="Sign In">
            <div className="w-screen h-screen">
                <div className="w-full bg-gradient-to-b from-brand-800 to-dark-900 h-2/3">
                    <NavBar />

                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        onSubmit={async ({ email, password }) => {
                            const res = await auth.signin({
                                email,
                                password,
                            });

                            if (!res.success) {
                                toast.error(res.message);
                                return;
                            }

                            toast.success(res.message);
                            setRedirecting(true);
                            router.push("/messages");
                        }}
                    >
                        {(props) => (
                            <Card
                                inverted
                                as={Form}
                                className={clsx(
                                    "max-w-md mx-auto mt-16 space-y-4",
                                    redirecting && "flex justify-center items-center h-56"
                                )}
                            >
                                {redirecting ? (
                                    <Spinner />
                                ) : (
                                    <>
                                        <div className="text-5xl italic font-bold text-center">
                                            Sign In
                                        </div>
                                        <div className="space-y-4">
                                            <Input
                                                label="Email"
                                                name="email"
                                                placeholder="Email..."
                                                type="email"
                                                disabled={props.isSubmitting}
                                                initialFocus
                                            />
                                            <Input
                                                label="Password"
                                                name="password"
                                                placeholder="Password..."
                                                type="password"
                                                disabled={props.isSubmitting}
                                            />
                                        </div>
                                        <div className="flex flex-row-reverse items-center justify-between">
                                            <Button type="submit" isSubmitting={props.isSubmitting}>
                                                Sign in
                                            </Button>
                                            <div className="text-xs">
                                                <span>{"Don't have an account?"}</span>
                                                <Link passHref href="/signup">
                                                    <a className="ml-2 font-semibold cursor-pointer hover:underline text-brand-500">
                                                        Sign up
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </Card>
                        )}
                    </Formik>
                </div>
            </div>
        </Layout>
    );
}
