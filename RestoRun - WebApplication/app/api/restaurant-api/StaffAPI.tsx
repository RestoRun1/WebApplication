import axios from 'axios';

interface StaffMember {
    id: string;
    name: string;
    description: string;
    role: string;
}

class StaffAPI {
    private baseUrl: string;
    private standardPath: string;
    private axiosInstance = axios.create();

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.standardPath = `${this.baseUrl}/api/staff`;
    }

    private handleError(error: any): string {
        return 'Error occurred';
    }

    private handleResponse(response: any): any {
        return response.data;
    }

    public async retrieveStaff(): Promise<StaffMember[]> {
        try {
            const response = await this.axiosInstance.get<StaffMember[]>(`${this.standardPath}/retrieveAllStaff`);
            return this.handleResponse(response);
        } catch (error) {
            throw new Error(this.handleError(error));
        }
    }

    public async retrieveStaffMemberById(id: string): Promise<StaffMember> {
        try {
            const response = await this.axiosInstance.get<StaffMember>(`${this.standardPath}/retrieveStaffById/${id}`);
            return this.handleResponse(response);
        } catch (error) {
            throw new Error(this.handleError(error));
        }
    }

    public async saveStaffMember(staffMember: StaffMember): Promise<StaffMember> {
        try {
            const response = await this.axiosInstance.post<StaffMember>(`${this.standardPath}/saveStaff`, staffMember);
            return response.data;
        } catch (error) {
            throw new Error('Failed to save staff member');
        }
    }

    public async deleteStaffMember(id: string): Promise<void> {
        try {
            await this.axiosInstance.delete(`${this.standardPath}/deleteStaff/${id}`);
        } catch (error) {
            throw new Error(`Failed to delete staff member with ID ${id}`);
        }
    }
}
