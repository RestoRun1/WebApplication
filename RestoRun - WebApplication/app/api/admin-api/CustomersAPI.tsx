import axios from 'axios';

interface Customer {
    userId: string,
    username: string;
    email: string;
    password: string;
}

class CustomersAPI {
    private baseUrl: string;
    private standardPath: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.standardPath = `${this.baseUrl}/api/customer`;
    }

    // Save a new customer
    public async saveCustomer(customer: Customer): Promise<Customer> {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post<Customer>(`${this.standardPath}/saveCustomer`, customer, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to save customer');
        }
    }

    // Retrieve a restaurant by ID
    // Change restaurant to customer
    public async retrieveCustomerById(id: string): Promise<Customer> {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get<Customer>(`${this.standardPath}/retrieveCustomerById/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to retrieve customer with ID ${id}`);
        }
    }

    // Retrieve all restaurants
    // Change restaurants to customers
    public async retrieveAllCustomers(): Promise<Customer[]> {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get<Customer[]>(`${this.standardPath}/retrieveAllCustomers`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve all customers');
        }
    }

    // Delete a customer
    public async deleteCustomer(id: string): Promise<void> {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${this.standardPath}/deleteCustomer/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            throw new Error(`Failed to delete customer with ID ${id}`);
        }
    }
}

export default CustomersAPI;
