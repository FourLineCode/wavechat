import { gql, useMutation } from '@apollo/client';
import { MessageSocketEvents } from '@shared/socket/events';
import { MediaDTO, MessageDTO } from '@shared/types/message';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import Dropzone from 'react-dropzone';
import toast from 'react-hot-toast';
import { CgImage } from 'react-icons/cg';
import { ImCross } from 'react-icons/im';
import {
	MessageThread,
	UploadMultipleFilesMutation,
	UploadMultipleFilesMutationVariables,
} from 'src/apollo/__generated__/types';
import { Button } from 'src/components/ui/Button';
import { Modal } from 'src/components/ui/Modal';
import { Tooltip } from 'src/components/ui/Tooltip';
import { useModal } from 'src/hooks/useModal';
import { SocketState } from 'src/socket/useSocket';
import { useAuth } from 'src/store/useAuth';

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

	const [uploadFiles, { loading }] = useMutation<
		UploadMultipleFilesMutation,
		UploadMultipleFilesMutationVariables
	>(UPLOAD_MULTIPLE_FILES, {
		variables: { files: files },
		onCompleted: (data) => {
			setFiles([]);
			imageInputModal.onClose();

			if (!currentUser) {
				toast.error('You are not signed in');
				return;
			}

			const uploadedFiles: MediaDTO[] = data.uploadMultipleFiles.map((file) => ({
				url: file.url,
				filename: file.filename,
				mimetype: file.mimetype,
				encoding: file.encoding,
			}));

			const messageDTO: MessageDTO = {
				body: '',
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

			toast.success('Uploaded successfully');
		},
		onError: (error) => {
			setFiles([]);
			toast.error(error.message);
		},
	});

	return (
		<>
			<div
				onClick={imageInputModal.onOpen}
				className='p-2.5 transition-colors ml-2 border border-opacity-75 rounded-md cursor-pointer text-secondary hover:text-primary hover:bg-dark-600 hover:bg-opacity-40 border-dark-600'
			>
				<CgImage size='24' />
			</div>
			<Modal initialFocus={cancelButtonRef} large {...imageInputModal}>
				<Dropzone
					accept='image/png, image/jpg, image/jpeg, image/webp'
					onDrop={(curr) => setFiles((prev) => [...prev, ...curr])}
				>
					{({ getRootProps, getInputProps }) => (
						<div
							className={clsx(
								'flex items-center justify-center w-full p-2 mb-4 transition-colors border border-dashed rounded-lg cursor-pointer bg-opacity-60 hover:bg-dark-700 border-dark-600',
								files.length > 0 ? 'py-12' : 'py-20'
							)}
							{...getRootProps()}
						>
							<input {...getInputProps()} />
							<span className='text-xl text-center text-secondary'>
								Drop files here or select files to upload
							</span>
						</div>
					)}
				</Dropzone>
				{files.length > 0 && (
					<div className='grid h-24 grid-cols-4 gap-2 mb-4 md:gap-4'>
						{files.slice(0, 3).map((file) => {
							const url = URL.createObjectURL(file);
							return (
								<img
									className='object-cover w-full h-full rounded-lg'
									src={url}
									alt='image'
									key={file.name}
								/>
							);
						})}
						{files.length > 3 && (
							<div className='flex items-center justify-center w-full h-full text-xs border border-opacity-50 rounded-lg md:text-sm border-dark-700 text-secondary'>{`+${
								files.length - 3
							} other ...`}</div>
						)}
					</div>
				)}
				<div
					className={clsx(
						'flex space-x-4',
						files.length > 0 ? 'justify-between' : 'justify-end'
					)}
				>
					{files.length > 0 && (
						<Tooltip text='Clear Selection' position='bottom'>
							<Button
								variant='outlined'
								disabled={!files.length}
								onClick={() => setFiles([])}
							>
								<ImCross />
							</Button>
						</Tooltip>
					)}
					<div className='flex justify-end w-full space-x-3'>
						<Button
							ref={cancelButtonRef}
							variant='outlined'
							onClick={imageInputModal.onClose}
						>
							Cancel
						</Button>
						<Button
							onClick={uploadFiles}
							isSubmitting={loading}
							type='submit'
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
