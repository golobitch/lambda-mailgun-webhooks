export interface IEventData {
    timestamp: string;
    tags: string[];
    storage: IEventDataStorage;
    envelope: IEventDataEnvelope;
    recipientDomain: string;
    event: string;
    compaigns: string[];
    userVariables: IEventDataUserVariables;
    flags: IEventDataFlags;
    logLevel: string;
    message: IEventDataMessage;
    recipient: string;
    id: string;
    deliveryStatus: IEventDataDeliveryStatus;
}

interface IEventDataUserVariables {
    [key: string]: string;
}

interface IEventDataFlags {
    [key: string]: string;
}

interface IEventDataStorage {
    url: string;
    key: string;
}

interface IEventDataEnvelope {
    transport: string;
    sender: string;
    sendingIp: string;
    targets: string;
}

interface IEventDataMessage {
    size: number;
    attachment: string[];
    headers: IEventDataMessageHeaders;
}

interface IEventDataMessageHeaders {
    to: string;
    messageId: string;
    from: string;
    subject: string;
}

interface IEventDataDeliveryStatus {
    tls: boolean;
    mxHost: string;
    attemptNo: number;
    description: string;
    sessionSeconds: number;
    utf8: boolean;
    code: number;
    message: string;
    certificateVerified: boolean;
}

export class EventDataDto implements IEventData {
    public timestamp: string;
    public tags: string[];
    public storage: EventDataStorage;
    public envelope: EventDataEnvelope;
    public recipientDomain: string;
    public event: string;
    public compaigns: string[];
    public userVariables: EventDataUserVariables;
    public flags: EventDataFlags;
    public logLevel: string;
    public message: EventDataMessage;
    public recipient: string;
    public id: string;
    public deliveryStatus: EventDataDeliveryStatus;

    public constructor(data: IEventData) {
        this.timestamp = data.timestamp;
        this.tags = data.tags;
        this.storage = data.storage;
        this.envelope = data.envelope;
        this.recipientDomain = data.recipientDomain;
        this.event = data.event;
        this.compaigns = data.compaigns;
        this.userVariables = data.userVariables;
        this.flags = data.flags;
        this.logLevel = data.logLevel;
        this.message = data.message;
        this.recipient = data.recipient;
        this.id = data.id;
        this.deliveryStatus = data.deliveryStatus;
    }
}

class EventDataStorage implements IEventDataStorage {
    public url: string;
    public key: string;
}

class EventDataEnvelope implements IEventDataEnvelope {
    public transport: string;
    public sender: string;
    public sendingIp: string;
    public targets: string;
}

class EventDataUserVariables implements IEventDataUserVariables {
    [key: string]: string;
}

class EventDataFlags implements IEventDataFlags {
    [key: string]: string;
}

class EventDataMessage implements IEventDataMessage {
    public size: number;
    public attachment: string[];
    public headers: EventDataMessageHeaders;
}

class EventDataMessageHeaders implements IEventDataMessageHeaders {
    public to: string;
    public messageId: string;
    public from: string;
    public subject: string;
}

class EventDataDeliveryStatus implements IEventDataDeliveryStatus {
    public tls: boolean;
    public mxHost: string;
    public attemptNo: number;
    public description: string;
    public sessionSeconds: number;
    public utf8: boolean;
    public code: number;
    public message: string;
    public certificateVerified: boolean;
}
