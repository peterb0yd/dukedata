import { MessageKind } from "~/enums/chat/MessageKind";

export interface IChatMessage {
    id?: string;
    body: string;
    kind: MessageKind;
    sentAt: Date;
}