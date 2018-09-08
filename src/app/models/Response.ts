export interface Response {
    code?: number;
    message?: string;
    error?: string;
    jwt?: string;
    auth?: boolean;
    data?: object;
}
