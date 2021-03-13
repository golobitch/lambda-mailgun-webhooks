export interface ISignatureDto {
    token: string;
    timestamp: string;
    signature: string;
}

export class SignatureDto implements ISignatureDto {
    public signature: string;
    public timestamp: string;
    public token: string;

    public constructor(data: ISignatureDto) {
        this.signature = data.signature;
        this.timestamp = data.timestamp;
        this.token = data.token;
    }
}
