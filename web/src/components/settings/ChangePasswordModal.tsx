import { gql, useMutation } from "@apollo/client";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import {
	ChangePasswordMutation,
	ChangePasswordMutationVariables,
} from "src/apollo/__generated__/types";
import { Button } from "src/components/ui/Button";
import { Input } from "src/components/ui/Input";
import { Modal } from "src/components/ui/Modal";
import { ModalProps } from "src/hooks/useModal";
import { parseErrorMessage } from "src/utils/parseErrorMessage";

interface Props {
	modalProps: ModalProps;
}

const CHANGE_PASSWORD = gql`
	mutation ChangePassword($input: ChangePasswordInput!) {
		changePassword(input: $input) {
			success
		}
	}
`;

export function ChangePasswordModal({ modalProps }: Props) {
	const [changePassword, { loading }] = useMutation<
		ChangePasswordMutation,
		ChangePasswordMutationVariables
	>(CHANGE_PASSWORD, {
		onCompleted: () => {
			modalProps.onClose();
			toast.success("Password changed successfully");
		},
		onError: (error) => {
			const message = parseErrorMessage(error);
			toast.error(message);
		},
	});

	return (
		<Modal {...modalProps}>
			<Formik
				initialValues={{
					oldPassword: "",
					newPassword: "",
					confirmNewPassword: "",
				}}
				onSubmit={async ({ oldPassword, newPassword, confirmNewPassword }) => {
					if (newPassword !== confirmNewPassword) {
						toast.error("Passwords do not match");
						return;
					}

					await changePassword({
						variables: {
							input: {
								oldPassword,
								newPassword,
							},
						},
					});
				}}
			>
				{(props) => (
					<Form className="space-y-4">
						<div className="text-2xl font-bold text-center">Change password</div>
						<Input
							name="oldPassword"
							placeholder="Old Password"
							label="Old Password"
							type="password"
							disabled={props.isSubmitting}
						/>
						<Input
							name="newPassword"
							placeholder="New Password"
							label="New Password"
							type="password"
							disabled={props.isSubmitting}
						/>
						<Input
							name="confirmNewPassword"
							placeholder="Confirm new password"
							label="Confirm new password"
							type="password"
							disabled={props.isSubmitting}
						/>
						<div className="flex flex-row-reverse pt-4 justify-center items-center">
							<Button type="submit" isSubmitting={loading}>
								Change Password
							</Button>
							<Button
								className="mr-4"
								variant="outlined"
								onClick={modalProps.onClose}
							>
								Cancel
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</Modal>
	);
}
