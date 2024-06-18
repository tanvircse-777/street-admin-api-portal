export interface CommonResponse<T> {
    code: number;
    message: string;
    data: T;
}
export declare enum CommonStatus {
    ACTIVE = "Active",
    INACTIVE = "Inactive"
}
