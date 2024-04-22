import axios from 'axios';

interface Event {
    id: string;
    name: string;
    description: string;
    location: string;
    eventDetails: EventDetail[];
}

interface EventDetail {
    id: string;
    type: string;
    start: string;
    end: string;
    participants: number;
}

class EventAPI {
    private baseUrl: string;
    private standardPath: string;
    private axiosInstance = axios.create();

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.standardPath = `${this.baseUrl}/api/events`;
    }

    private handleError(error: any): string {
        return 'Error occurred';
    }

    private handleResponse(response: any): any {
        return response.data;
    }

    public async retrieveEvents(): Promise<Event[]> {
        try {
            const response = await this.axiosInstance.get<Event[]>(`${this.standardPath}/retrieveAllEvents`);
            return this.handleResponse(response);
        } catch (error) {
            throw new Error(this.handleError(error));
        }
    }

    public async retrieveEventById(id: string): Promise<Event> {
        try {
            const response = await this.axiosInstance.get<Event>(`${this.standardPath}/retrieveEventById/${id}`);
            return this.handleResponse(response);
        } catch (error) {
            throw new Error(this.handleError(error));
        }
    }

    public async saveEvent(event: Event): Promise<Event> {
        try {
            const response = await this.axiosInstance.post<Event>(`${this.standardPath}/saveEvent`, event);
            return response.data;
        } catch (error) {
            throw new Error('Failed to save event');
        }
    }

    public async deleteEvent(id: string): Promise<void> {
        try {
            await this.axiosInstance.delete(`${this.standardPath}/deleteEvent/${id}`);
        } catch (error) {
            throw new Error(`Failed to delete event with ID ${id}`);
        }
    }
}
