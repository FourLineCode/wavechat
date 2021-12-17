import { Tab } from "@headlessui/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { Button } from "src/components/ui/Button";
import { Input } from "src/components/ui/Input";
import { Textarea } from "src/components/ui/Textarea";
import { useAuth } from "src/store/useAuth";

/*
username (disabled)
displayName
bio
avatar
university
department
semester
*/

export function ProfileSettings() {
	const user = useAuth().user;
	const [file, setFile] = useState<File | null>(null);

	return (
		<Tab.Panel className="w-full">
			<Formik
				initialValues={{
					username: user?.username,
					displayName: user?.displayName,
					bio: user?.bio,
					avatarUrl: user?.avatarUrl,
					university: user?.university,
					department: user?.department,
					semester: user?.semester,
				}}
				onSubmit={async (values) => {
					await new Promise((resolve) => {
						console.log(JSON.stringify(values, null, 2));
						setTimeout(resolve, 2000);
					});
				}}
			>
				{(props) => (
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
									disabled={props.isSubmitting}
									name="displayName"
									label="Display Name"
									placeholder="Display Name"
								/>
							</div>
							<div className="flex flex-col items-center justify-center pl-6 space-y-2 group w-44">
								<img
									src={file ? URL.createObjectURL(file) : user?.avatarUrl!}
									alt="avatar"
									className="relative object-cover w-24 h-24 rounded-full"
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
							<Textarea
								disabled={props.isSubmitting}
								name="bio"
								label="Bio"
								placeholder="Bio"
							/>
							<Input
								disabled={props.isSubmitting}
								name="university"
								label="University"
								placeholder="University"
							/>
							<Input
								disabled={props.isSubmitting}
								name="department"
								label="Department"
								placeholder="Department"
							/>
							<Input
								disabled={props.isSubmitting}
								name="semester"
								label="Semester"
								placeholder="Semester"
							/>
						</div>
						<div className="flex justify-end py-2">
							<Button isSubmitting={props.isSubmitting} type="submit">
								Save Profile
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</Tab.Panel>
	);
}
