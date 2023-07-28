import { MessageKind } from "@prisma/client";

export interface IMessageCreate {
    body: string;
    kind: MessageKind;
}