import { gql, useMutation } from "@apollo/client";
import clsx from "clsx";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import Dropzone from "react-dropzone";
import toast from "react-hot-toast";
import { BiImageAdd } from "react-icons/bi";
import { FaChevronDown, FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import {
    CreateServerMutation,
    CreateServerMutationVariables,
    UploadServerIconMutation,
    UploadServerIconMutationVariables,
} from "src/apollo/__generated__/types";
import { GET_JOINED_SERVERS } from "src/components/navigations/NavigationServersList";
import { Button } from "src/components/ui/Button";
import { Input } from "src/components/ui/Input";
import { Modal } from "src/components/ui/Modal";
import { Tooltip } from "src/components/ui/Tooltip";
import { useModal } from "src/hooks/useModal";

const CREATE_SERVER = gql`
    mutation CreateServer($input: CreateServerInput!) {
        createServer(input: $input) {
            id
        }
    }
`;

const UPLOAD_SERVER_ICON = gql`
    mutation UploadServerIcon($file: Upload!) {
        uploadSingleFile(file: $file) {
            url
            filename
            mimetype
            encoding
        }
    }
`;

export function CreateServerModal() {
    const router = useRouter();
    const createServerModal = useModal();
    const [iconFile, setIconFile] = useState<File | null>(null);

    const [createServer] = useMutation<CreateServerMutation, CreateServerMutationVariables>(
        CREATE_SERVER,
        {
            onError: (error) => {
                setIconFile(null);
                toast.error(error.message);
            },
            onCompleted: (data) => {
                toast.success("Server created");
                router.push(data.createServer.id);
            },
            refetchQueries: [{ query: GET_JOINED_SERVERS }],
        }
    );

    const [uploadServerIcon] = useMutation<
        UploadServerIconMutation,
        UploadServerIconMutationVariables
    >(UPLOAD_SERVER_ICON, {
        onCompleted: () => {
            setIconFile(null);
        },
        onError: (error) => {
            setIconFile(null);
            toast.error(error.message);
        },
    });

    return (
        <>
            <Tooltip text="Create a server">
                <button
                    onClick={createServerModal.onOpen}
                    className={clsx(
                        createServerModal.show
                            ? "bg-brand-500 rounded-xl"
                            : "bg-dark-800 rounded-3xl",
                        "flex items-center focus:outline-none outline-none justify-center w-12 h-12 my-2 transition-all cursor-pointer group hover:bg-brand-500 hover:rounded-xl"
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
                    initialValues={{ serverName: "", serverType: "public", iconFile: null }}
                    onSubmit={async (values, form) => {
                        if (!iconFile) {
                            toast.error("Select an icon for server");
                            return;
                        }

                        if (!values.serverName.trim()) {
                            toast.error("Invalid server name");
                            return;
                        }

                        const { data, errors } = await uploadServerIcon({
                            variables: { file: iconFile },
                        });
                        if (!data || (errors && errors.length)) {
                            toast.error("Couldn't upload icon");
                            return;
                        }

                        await createServer({
                            variables: {
                                input: {
                                    name: values.serverName,
                                    type: values.serverType,
                                    iconUrl: data.uploadSingleFile.url,
                                },
                            },
                        });

                        createServerModal.onClose();
                        form.resetForm();
                    }}
                >
                    {(props) => (
                        <Form className="mt-4 space-y-3">
                            <Dropzone
                                accept="image/png, image/jpg, image/jpeg, image/webp"
                                onDrop={([curr]) => setIconFile(curr)}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <div
                                        className="flex items-center justify-center w-full cursor-pointer focus:outline-none group"
                                        {...getRootProps()}
                                    >
                                        <input {...getInputProps()} />
                                        {iconFile ? (
                                            <div className="relative">
                                                <img
                                                    alt="icon"
                                                    className="object-cover w-20 h-20 rounded-lg"
                                                    src={URL.createObjectURL(iconFile)}
                                                    key={iconFile.name}
                                                />
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        e.preventDefault();
                                                        setIconFile(null);
                                                    }}
                                                    className="absolute p-1 transition-transform transform bg-red-500 rounded-full -top-1 -right-1 hover:scale-125"
                                                >
                                                    <ImCross className="w-2 h-2 text-primary" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="p-4 transition-colors border-2 border-dashed rounded-full border-dark-600 group-focus:border-brand-500 group-hover:bg-dark-700 group-hover:bg-opacity-50">
                                                <BiImageAdd className="w-12 h-12 text-secondary" />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Dropzone>
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
