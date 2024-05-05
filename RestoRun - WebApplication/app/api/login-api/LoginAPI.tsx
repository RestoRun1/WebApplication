import axios from "axios";
import {types} from "sass";
import List = types.List;

interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    token: string;
    roles: List;
}

class LoginAPI {
    private baseUrl: string;
    private standardPath: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.standardPath = `${this.baseUrl}/api/auth`;
    }

    public async login(loginRequest: LoginRequest): Promise<LoginResponse> {
        try {
            const response = await axios.post(`${this.standardPath}/login`, loginRequest);
            return response.data;
        } catch (error) {
            throw new Error('Failed to login');
        }
    }
}

export default LoginAPI;