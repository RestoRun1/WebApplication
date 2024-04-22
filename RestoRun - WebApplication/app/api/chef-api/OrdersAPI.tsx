import axios from 'axios';
interface Order {
    // Order will have the following properties
    id: string;
    meals: string[];
    totalPrice: number;
    status: OrderStatus;
    diningTable: string;
    kitchen: string;
}

enum OrderStatus {
    // OrderStatus will have the following properties
    PENDING = 'PENDING',
    PREPARING = 'PREPARING',
    READY = 'READY',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
}

class OrdersAPI {
    private baseUrl: string;
    private standardPath: string;
    private axiosInstance = axios.create();

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.standardPath = `${this.baseUrl}/api/order`;
    }

    private handleError(error: any): string {
        return 'Error occurred';
    }

    private handleResponse(response: any): any {
        return response.data;
    }

    public async retrieveAllOrders(): Promise<Order[]> {
        try {
            const response = await this.axiosInstance.get<Order[]>(`${this.standardPath}/retrieveAllOrders`);
            return this.handleResponse(response);
        } catch (error) {
            throw new Error(this.handleError(error));
        }
    }

    public async retrieveOrderById(id: string): Promise<Order> {
        try {
            const response = await this.axiosInstance.get<Order>(`${this.standardPath}/retrieveOrderById/${id}`);
            return this.handleResponse(response);
        } catch (error) {
            throw new Error(this.handleError(error));
        }
    }

    public async updateOrder(order: Order): Promise<void> {
        try {
            await this.axiosInstance.put(`${this.standardPath}/updateOrder`, order);
        } catch (error) {
            throw new Error(this.handleError(error));
        }
    }

    public async deleteOrder(id: string): Promise<void> {
        try {
            await this.axiosInstance.delete(`${this.standardPath}/deleteOrder/${id}`);
        } catch (error) {
            throw new Error(this.handleError(error));
        }
    }

    public async createOrder(order: Order): Promise<Order> {
        try {
            const response = await this.axiosInstance.post<Order>(`${this.standardPath}/createOrder`, order);
            return this.handleResponse(response);
        } catch (error) {
            throw new Error(this.handleError(error));
        }
    }

    public async retrieveOrdersByChefId(id: string): Promise<Order[]> {
        try {
            const response = await this.axiosInstance.get<Order[]>(`${this.standardPath}/retrieveOrdersByChefId/${id}`);
            return this.handleResponse(response);
        } catch (error) {
            throw new Error(this.handleError(error));
        }
    }
}
