import axios from "axios";

interface Order {
    id: string,
    meals: Meal[];
    totalPrice: number;
    status: string;
    diningTable: string;
}

interface Meal {
    id: string;
    name: string;
    description: string;
    price: number;
}

class OrdersAPI {
    private baseUrl: string;
    private standardPath: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.standardPath = `${this.baseUrl}/api/order`;
    }

    public async saveOrder(order: Order): Promise<Order> {
        try {
            const response = await axios.post<Order>(`${this.standardPath}/saveOrder`, order);
            return response.data;
        } catch (error) {
            throw new Error('Failed to save order');
        }
    }

    public async retrieveOrderById(id: string): Promise<Order> {
        try {
            const response = await axios.get<Order>(`${this.standardPath}/retrieveOrderById/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to retrieve order with ID ${id}`);
        }
    }

    public async retrieveAllOrders(): Promise<Order[]> {
        try {
            const response = await axios.get<Order[]>(`${this.standardPath}/retrieveAllOrders`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve all orders');
        }
    }

    public async deleteOrder(id: string): Promise<void> {
        try {
            await axios.delete(`${this.standardPath}/deleteOrder/${id}`);
        } catch (error) {
            throw new Error(`Failed to delete order with ID ${id}`);
        }
    }
}

export default OrdersAPI;