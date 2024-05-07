import axios from 'axios';

interface Employee {
    userId: string;
    username: string;
    role: string;
    email: string;
    startDate: Date;
}

class EmployeeAPI {
    private baseUrl: string;
    private standardPath: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.standardPath = `${this.baseUrl}/api/employee`;
    }

    public async retrieveAllEmployeesByRestaurantId(id: string): Promise<Employee[]> {
        // add token that was stored in the local storage to the header
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get<Employee[]>(`${this.standardPath}/retrieveAllEmployeesByRestaurantId/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve all employees');
        }
    }

    public async retrieveEmployeeById(id: string): Promise<Employee> {
        try {
            const response = await axios.get<Employee>(`${this.standardPath}/retrieveEmployeeById/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to retrieve employee with ID ${id}`);
        }
    }

    public async saveEmployee(employee: Employee): Promise<Employee> {
        try {
            const response = await axios.post<Employee>(`${this.standardPath}/saveEmployee`, employee);
            return response.data;
        } catch (error) {
            throw new Error('Failed to save employee');
        }
    }

    public async deleteEmployee(id: string): Promise<void> {
        try {
            await axios.delete(`${this.standardPath}/deleteEmployee/${id}`);
        } catch (error) {
            throw new Error(`Failed to delete employee with ID ${id}`);
        }
    }
}

export default EmployeeAPI;