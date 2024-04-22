import axios from 'axios';

interface User {
    id: string,
    username: string;
    email: string;
    role: string;
}

class UsersAPI {
    private baseUrl: string;
    private standardPath: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.standardPath = `${this.baseUrl}/api/user`;
    }

    // Save a new user
    public async saveUser(user: User): Promise<User> {
        try {
            const response = await axios.post<User>(`${this.standardPath}/saveUser`, user);
            return response.data;
        } catch (error) {
            throw new Error('Failed to save user');
        }
    }

    // Retrieve a restaurant by ID
    // Change restaurant to user
    public async retrieveUserById(id: string): Promise<User> {
        try {
            const response = await axios.get<User>(`${this.standardPath}/retrieveUserById/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to retrieve user with ID ${id}`);
        }
    }

    // Retrieve all restaurants
    // Change restaurants to users
    public async retrieveAllUsers(): Promise<User[]> {
        try {
            const response = await axios.get<User[]>(`${this.standardPath}/retrieveAllUsers`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve all users');
        }
    }

    // Delete a user
    public async deleteUser(id: string): Promise<void> {
        try {
            await axios.delete(`${this.standardPath}/deleteUser/${id}`);
        } catch (error) {
            throw new Error(`Failed to delete user with ID ${id}`);
        }
    }
}

export default UsersAPI;
