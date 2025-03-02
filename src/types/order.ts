import { Status } from "./status";

export type Order = {
    id?: string | null;
    client: {
        id: string;
        name: string;
    };
    date: string;
    status: Status;
    items: Array<{
        productId: string;
        productName: string;
        quantity: number;
        price: number;
    }>;
    quantityTotal?: number;
    total: number;
}
