import { gql, useMutation } from "@apollo/client";
import { Tab } from "@headlessui/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import {
    UpdateUserInput,
    UpdateUserMutation,
    UpdateUserMutationVariables,
    UploadAvatarMutation,
    UploadAvatarMutationVariables,
    User,
} from "src/apollo/__generated__/types";
import { Button } from "src/components/ui/Button";
import { Input } from "src/components/ui/Input";
import { Textarea } from "src/components/ui/Textarea";
import { useAuth } from "src/store/useAuth";
import { parseErrorMessage } from "src/utils/parseErrorMessage";

const UPDATE_USER = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
            id
            email
            username
            displayName
            avatarUrl
            bio
            role
            createdAt
            updatedAt
            university
            department
            semester
        }
    }
`;

const UPLOAD_AVATAR = gql`
    mutation UploadAvatar($file: Upload!) {
        uploadSingleFile(file: $file) {
            url
            filename
            mimetype
            encoding
        }
    }
`;

export function ProfileSettings() {
    const auth = useAuth();
    const user = auth.user;
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const [updateUser] = useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UPDATE_USER, {
        onCompleted: (data) => {
            auth.setAuthInfo({ user: data.updateUser as User });
            toast.success("Successfully updated profile");
        },
        onError: (error) => {
            const message = parseErrorMessage(error);
            toast.error(message);
        },
    });

    const [uploadAvatar] = useMutation<UploadAvatarMutation, UploadAvatarMutationVariables>(
        UPLOAD_AVATAR,
        {
            onCompleted: () => {
                setFile(null);
            },
            onError: () => {
                toast.error("Failed to upload avatar");
            },
        }
    );

    return (
        <Tab.Panel className="w-full">
            <Formik
                initialValues={{
                    username: user?.username ?? "",
                    displayName: user?.displayName ?? "",
                    bio: user?.bio ?? "",
                    avatarUrl: user?.avatarUrl ?? "",
                    university: user?.university ?? "",
                    department: user?.department ?? "",
                    semester: user?.semester ?? 0,
                }}
                onSubmit={async (values) => {
                    setLoading(true);

                    const input: UpdateUserInput = {
                        displayName:
                            values.displayName !== user?.displayName
                                ? values.displayName
                                : undefined,
                        bio: values.bio !== user?.bio ? values.bio : undefined,
                        avatarUrl:
                            values.avatarUrl !== user?.avatarUrl ? values.avatarUrl : undefined,
                        university:
                            values.university !== user?.university ? values.university : undefined,
                        department:
                            values.department !== user?.department ? values.department : undefined,
                        semester: values.semester !== user?.semester ? values.semester : undefined,
                    };

                    if (file) {
                        const { data } = await uploadAvatar({ variables: { file } });
                        if (data?.uploadSingleFile.url) {
                            input.avatarUrl = data?.uploadSingleFile.url;
                        }
                    }

                    await updateUser({
                        variables: {
                            input,
                        },
                    });

                    setLoading(false);
                }}
            >
                <Form className="space-y-2.5">
                    <div className="flex">
                        <div className="flex-1 space-y-2.5">
                            <Input
                                disabled
                                name="username"
                                label="Username"
                                placeholder="Username"
                            />
                            <Input
                                disabled={loading}
                                name="displayName"
                                label="Display Name"
                                placeholder="Display Name"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center pl-6 space-y-2 group w-44">
                            <img
                                src={file ? URL.createObjectURL(file) : user?.avatarUrl!}
                                alt="avatar"
                                className="relative object-cover w-24 h-24 rounded-lg"
                            />
                            <label
                                htmlFor="avatar"
                                className="px-2 py-1 text-xs font-semibold bg-transparent max-w-[150px] truncate overflow-hidden border rounded-md cursor-pointer text-ellipsis hover:bg-dark-800 border-brand-500"
                            >
                                {file ? file.name : "Upload image"}
                            </label>
                            <input
                                type="file"
                                id="avatar"
                                name="avatar"
                                className="hidden"
                                accept="image/png, image/jpg, image/jpeg, image/webp"
                                onChange={(e) => setFile(e.target.files && e.target.files[0])}
                            />
                        </div>
                    </div>
                    <div className="space-y-2.5">
                        <Textarea disabled={loading} name="bio" label="Bio" placeholder="Bio" />
                        <Input
                            disabled={loading}
                            name="university"
                            label="University"
                            placeholder="University"
                        />
                        <Input
                            disabled={loading}
                            name="department"
                            label="Department"
                            placeholder="Department"
                        />
                        <Input
                            disabled={loading}
                            name="semester"
                            type="number"
                            label="Semester"
                            placeholder="Semester"
                        />
                    </div>
                    <div className="flex justify-end py-2">
                        <Button isSubmitting={loading} type="submit">
                            Save Profile
                        </Button>
                    </div>
                </Form>
            </Formik>
        </Tab.Panel>
    );
}
