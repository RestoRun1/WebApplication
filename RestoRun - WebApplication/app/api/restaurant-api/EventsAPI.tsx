import axios from 'axios';

interface Event {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
}

class EventsAPI {
    private baseUrl: string;
    private standardPath: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.standardPath = `${this.baseUrl}/api/events`;
    }

    public async retrieveAllEvents(): Promise<Event[]> {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get<Event[]>(`${this.standardPath}/retrieveAllEvents`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve all events');
        }
    }

    public async retrieveEventById(id: string): Promise<Event> {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get<Event>(`${this.standardPath}/retrieveEventById/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to retrieve meal with ID ${id}`);
        }
    }

    public async saveEvent(event: Event): Promise<Event> {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post<Event>(`${this.standardPath}/saveEvent`, event, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to save event');
        }
    }

    public async deleteEvent(id: string): Promise<void> {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${this.standardPath}/deleteEvent/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            throw new Error(`Failed to delete event with ID ${id}`);
        }
    }
}

export default EventsAPI;
