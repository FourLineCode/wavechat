import { gql, useMutation } from "@apollo/client";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import {
    InviteUserToServerByUsernameMutation,
    InviteUserToServerByUsernameMutationVariables,
    Server,
} from "src/apollo/__generated__/types";
import { Button } from "src/components/ui/Button";
import { Input } from "src/components/ui/Input";

interface Props {
    server: Server;
}

const INVITE_USER_TO_SERVER_BY_USERNAME = gql`
    mutation InviteUserToServerByUsername($serverId: String!, $username: String!) {
        inviteUserToServerByUsername(serverId: $serverId, username: $username) {
            id
        }
    }
`;

export function InviteToServerByUsernameField({ server }: Props) {
    const [inviteUser] = useMutation<
        InviteUserToServerByUsernameMutation,
        InviteUserToServerByUsernameMutationVariables
    >(INVITE_USER_TO_SERVER_BY_USERNAME, {
        onError: () => {
            toast.error("Failed to send invite\nUser already invited or server is closed", {
                style: {
                    textAlign: "center",
                },
            });
        },
        onCompleted: () => {
            toast.success("Successfully sent invite");
        },
    });

    return (
        <Formik
            initialValues={{ inviteUsername: "" }}
            onSubmit={async ({ inviteUsername }) => {
                if (!inviteUsername.trim()) {
                    return;
                }

                await inviteUser({
                    variables: {
                        serverId: server.id,
                        username: inviteUsername.trim(),
                    },
                });
            }}
        >
            {(props) => (
                <Form className="flex items-center w-full my-4 space-x-2">
                    <Input
                        initialFocus
                        name="inviteUsername"
                        type="text"
                        placeholder="Username..."
                        disabled={props.isSubmitting}
                        className="flex-1"
                    />
                    <Button type="submit" isSubmitting={props.isSubmitting}>
                        Invite
                    </Button>
                </Form>
            )}
        </Formik>
    );
}
