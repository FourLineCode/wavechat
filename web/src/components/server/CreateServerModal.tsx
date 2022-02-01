import clsx from "clsx";
import { Field, Form, Formik } from "formik";
import { FaChevronDown, FaPlus } from "react-icons/fa";
import { Button } from "src/components/ui/Button";
import { Input } from "src/components/ui/Input";
import { Modal } from "src/components/ui/Modal";
import { Tooltip } from "src/components/ui/Tooltip";
import { useModal } from "src/hooks/useModal";

export function CreateServerModal() {
    const createServerModal = useModal();

    return (
        <>
            <Tooltip text="Create a server">
                <button
                    onClick={createServerModal.onOpen}
                    className={clsx(
                        createServerModal.show
                            ? "bg-brand-500 rounded-xl"
                            : "bg-dark-800 rounded-3xl",
                        "flex items-center focus:outline-none justify-center w-12 h-12 my-2 transition-all cursor-pointer group hover:bg-brand-500 hover:rounded-xl"
                    )}
                >
                    <FaPlus
                        className={clsx(
                            createServerModal.show ? "text-primary" : "text-brand-500",
                            "w-6 h-6 transition-colors group-hover:text-primary"
                        )}
                    />
                </button>
            </Tooltip>
            <Modal {...createServerModal}>
                <div className="text-3xl font-bold text-center">Create a server</div>
                <Formik
                    initialValues={{ serverName: "", serverType: "public" }}
                    onSubmit={async (values, form) => {
                        await new Promise((resolve) => {
                            setTimeout(() => {
                                console.log(values);
                                form.resetForm();
                                createServerModal.onClose();
                                resolve(null);
                            }, 1000);
                        });
                    }}
                >
                    {(props) => (
                        <Form className="mt-4 space-y-3">
                            <Input
                                name="serverName"
                                label="Server name"
                                placeholder="Server name"
                            />
                            <div className="w-full">
                                <label htmlFor="serverType" className="pl-1 text-sm text-primary">
                                    Server type
                                </label>
                                <div className="relative w-full">
                                    <Field
                                        as="select"
                                        name="serverType"
                                        className="bg-dark-700 font-bold appearance-none w-full p-2 rounded-lg mt-0.5 transition focus:ring-4 placeholder-dark-500 text-primary focus:bg-dark-800 ring-brand-500 focus:outline-none"
                                    >
                                        <option value="public">Public</option>
                                        <option value="private">Private</option>
                                    </Field>
                                    <div className="absolute inset-y-0 flex items-center pointer-events-none right-2 text-secondary">
                                        <FaChevronDown className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row-reverse justify-between pt-6">
                                <Button type="submit" isSubmitting={props.isSubmitting}>
                                    Create Server
                                </Button>
                                <Button variant="outlined" onClick={createServerModal.onClose}>
                                    Cancel
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    );
}
