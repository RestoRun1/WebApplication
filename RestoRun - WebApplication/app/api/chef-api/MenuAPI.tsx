import axios from 'axios';
interface Menu{
    id: string;
    name: string;
    description: string;
    restaurant: string;
    menuItems: MenuItem[];
}

interface MenuItem{
    id: string;
    name: string;
    description: string;
    price: number;
}

class MenuAPI {
    private baseUrl: string;
    private standardPath: string;
    private axiosInstance = axios.create();

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.standardPath = `${this.baseUrl}/api/menu`;
    }

    private handleError(error: any): string {
        return 'Error occurred';
    }

    private handleResponse(response: any): any {
        return response.data;
    }

    public async retrieveMenuItems(): Promise<MenuItem[]> {
        try {
            const token = localStorage.getItem('token');
            const response = await this.axiosInstance.get<MenuItem[]>(`${this.standardPath}/retrieveAllMenuItems`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return this.handleResponse(response);
        } catch (error) {
            throw new Error(this.handleError(error));
        }
    }

    public async retrieveMenuItemById(id: string): Promise<MenuItem> {
        try {
            const token = localStorage.getItem('token');
            const response = await this.axiosInstance.get<MenuItem>(`${this.standardPath}/retrieveMenuItemById/${id}`,  {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return this.handleResponse(response);
        } catch (error) {
            throw new Error(this.handleError(error));
        }
    }

    public async saveMenuItem(menuItem: MenuItem): Promise<MenuItem> {
        try {
            const token = localStorage.getItem('token');
            const response = await this.axiosInstance.post<MenuItem>(`${this.standardPath}/saveMenuItem`, menuItem,  {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to save menu item');
        }
    }

    public async deleteMenuItem(id: string): Promise<void> {
        try {
            const token = localStorage.getItem('token');
            await this.axiosInstance.delete(`${this.standardPath}/deleteMenuItem/${id}`,  {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            throw new Error(`Failed to delete menu item with ID ${id}`);
        }
    }
}