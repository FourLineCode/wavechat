import { gql, useMutation } from "@apollo/client";
import { MediaDTO, MessageDTO, MessageSocketEvents } from "@wavechat/shared";
import clsx from "clsx";
import { Image, X } from "phosphor-react";
import React, { useRef, useState } from "react";
import Dropzone from "react-dropzone";
import toast from "react-hot-toast";
import {
    MessageThread,
    UploadMultipleFilesMutation,
    UploadMultipleFilesMutationVariables,
} from "src/apollo/__generated__/types";
import { Button } from "src/components/ui/Button";
import { Modal } from "src/components/ui/Modal";
import { Tooltip } from "src/components/ui/Tooltip";
import { useModal } from "src/hooks/useModal";
import { SocketState } from "src/socket/useSocket";
import { useAuth } from "src/store/useAuth";

interface Props {
    socket: SocketState;
    thread: MessageThread;
}

const UPLOAD_MULTIPLE_FILES = gql`
    mutation UploadMultipleFiles($files: [Upload!]!) {
        uploadMultipleFiles(files: $files) {
            url
            filename
            mimetype
            encoding
        }
    }
`;

export function MediaInput({ socket, thread }: Props) {
    const currentUser = useAuth().user;
    const imageInputModal = useModal();
    const [files, setFiles] = useState<File[]>([]);
    const cancelButtonRef = useRef<HTMLButtonElement>(null);

    const [uploadFiles, { loading, reset }] = useMutation<
        UploadMultipleFilesMutation,
        UploadMultipleFilesMutationVariables
    >(UPLOAD_MULTIPLE_FILES, {
        variables: { files: files },
        onCompleted: (data) => {
            setFiles([]);
            reset();
            imageInputModal.onClose();

            if (!currentUser) {
                toast.error("You are not signed in");
                return;
            }

            const uploadedFiles: MediaDTO[] = data.uploadMultipleFiles.map((file) => ({
                url: file.url,
                filename: file.filename,
                mimetype: file.mimetype,
                encoding: file.encoding,
            }));

            const messageDTO: MessageDTO = {
                body: "",
                attachments: uploadedFiles,
                threadId: thread.id,
                authorId: currentUser.id,
                author: {
                    id: currentUser.id,
                    username: currentUser.username,
                    displayName: currentUser.displayName,
                    avatarUrl: currentUser.avatarUrl,
                },
            };

            socket.conn.emit(MessageSocketEvents.SendMessage, messageDTO);

            toast.success("Uploaded successfully");
        },
        onError: () => {
            setFiles([]);
            reset();
            toast.error("Failed to upload files");
        },
    });

    return (
        <>
            <div
                onClick={imageInputModal.onOpen}
                className="p-2.5 transition-colors ml-2 border border-opacity-75 rounded-md cursor-pointer text-secondary hover:text-primary hover:bg-dark-600 hover:bg-opacity-40 border-dark-600"
            >
                <Image weight="fill" size={24} />
            </div>
            <Modal initialFocus={cancelButtonRef} large {...imageInputModal}>
                <Dropzone
                    accept="image/png, image/jpg, image/jpeg, image/webp"
                    onDrop={(curr) => setFiles((prev) => [...prev, ...curr])}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div
                            className={clsx(
                                "flex items-center focus:outline-none focus:ring-4 ring-opacity-50 ring-brand-500 justify-center w-full p-2 mb-4 transition-colors border border-dashed rounded-lg cursor-pointer bg-opacity-60 hover:bg-dark-700 border-dark-600",
                                files.length > 0 ? "py-12" : "py-20"
                            )}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <span className="text-xl text-center text-secondary">
                                Drop files here or select files to upload
                            </span>
                        </div>
                    )}
                </Dropzone>
                {files.length > 0 && (
                    <div className="grid w-full h-24 grid-cols-4 gap-2 mb-4 md:gap-4">
                        {files.slice(0, 3).map((file, index) => (
                            <div className="relative w-full h-full" key={file.name}>
                                <img
                                    className="object-cover w-full h-24 rounded-lg"
                                    src={URL.createObjectURL(file)}
                                    alt="image"
                                    key={file.name}
                                />
                                <div
                                    onClick={() => setFiles((p) => p.filter((_, i) => i !== index))}
                                    className="absolute p-1 transition-colors bg-red-500 bg-opacity-75 rounded-full cursor-pointer hover:bg-opacity-100 -top-1 -right-1"
                                >
                                    <X weight="fill" size={12} />
                                </div>
                            </div>
                        ))}
                        {files.length > 3 && (
                            <div className="flex items-center justify-center w-full h-full text-xs border border-opacity-50 rounded-lg md:text-sm border-dark-700 text-secondary">
                                {`+${files.length - 3} other ...`}
                            </div>
                        )}
                    </div>
                )}
                <div
                    className={clsx(
                        "flex space-x-4",
                        files.length > 0 ? "justify-between" : "justify-end"
                    )}
                >
                    {files.length > 0 && (
                        <Tooltip text="Clear Selection" position="bottom">
                            <button
                                onClick={() => setFiles([])}
                                className="flex items-center justify-center px-4 py-2 transition-colors border border-opacity-50 rounded-md cursor-pointer focus:outline-none focus:ring-4 ring-opacity-50 ring-brand-500 border-dark-600 hover:text-red-500 hover:bg-dark-700 hover:bg-opacity-50"
                            >
                                <X weight="bold" size={18} />
                            </button>
                        </Tooltip>
                    )}
                    <div className="flex justify-end w-full space-x-3">
                        <Button
                            ref={cancelButtonRef}
                            variant="outlined"
                            onClick={imageInputModal.onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            onClick={uploadFiles}
                            isSubmitting={loading}
                            disabled={files.length <= 0}
                        >
                            Upload
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
