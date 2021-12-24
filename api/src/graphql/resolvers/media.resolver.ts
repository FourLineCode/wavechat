import { ObjectRef } from "@giraphql/core";
import { Media } from "@prisma/client";
import { MediaDTO } from "@wavechat/shared";
import { builder } from "src/graphql/builder";
import { MessageObject } from "src/graphql/resolvers/message.resolver";
import { services } from "src/services";

export const MediaObject: ObjectRef<Media, Media> = builder.objectRef<Media>("Media").implement({
    name: "Media",
    description: "Media object",
    fields: (t) => ({
        id: t.exposeID("id"),
        pk: t.exposeInt("pk"),
        createdAt: t.expose("createdAt", { type: "Date" }),
        updatedAt: t.expose("updatedAt", { type: "Date" }),
        url: t.exposeString("url"),
        filename: t.exposeString("filename"),
        mimetype: t.exposeString("mimetype"),
        encoding: t.exposeString("encoding"),
        messageId: t.exposeID("messageId"),
        message: t.loadable({
            type: MessageObject,
            sort: (message) => message.id,
            load: (ids: string[]) => services.dataloader.loadMessageByIDs(ids),
            resolve: (media) => media.messageId,
        }),
    }),
});

export const MediaDTOObject: ObjectRef<MediaDTO, MediaDTO> = builder
    .objectRef<MediaDTO>("MediaDTO")
    .implement({
        name: "MediaDTO",
        description: "Response object for file upload",
        fields: (t) => ({
            url: t.exposeString("url"),
            filename: t.exposeString("filename"),
            mimetype: t.exposeString("mimetype"),
            encoding: t.exposeString("encoding"),
        }),
    });

builder.mutationField("uploadSingleFile", (t) =>
    t.field({
        type: MediaDTOObject,
        description: "Upload single file",
        authScopes: { user: true },
        args: { file: t.arg({ type: "Upload", required: true }) },
        resolve: async (_parent, { file }) => {
            return await services.media.uploadSingleFile(file);
        },
    })
);

builder.mutationField("uploadMultipleFiles", (t) =>
    t.field({
        type: [MediaDTOObject],
        description: "Upload multiple files",
        authScopes: { user: true },
        args: { files: t.arg({ type: ["Upload"], required: true }) },
        resolve: async (_parent, { files }) => {
            return await services.media.uploadMultipleFiles(files);
        },
    })
);
