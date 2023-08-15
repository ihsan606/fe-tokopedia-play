export interface BaseApiResponse<T = any> {
    code: number;
    message: string;
    data: T;
}