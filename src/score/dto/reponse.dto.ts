export class ResponseDto<T> {
    total_count: number;
    items: T;
    success: boolean;
    error?: string;
}