export class HandlerResponseDto {
    public statusCode: number;
    public body: string;
    public headers: Record<string, unknown>;
}
