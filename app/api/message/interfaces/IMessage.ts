import { MessageKind } from "~/api/message/enums/chat/MessageKind";

export interface IMessage {
    id?: string;
    body: string;
    kind: MessageKind;
    sentAt: Date;
}