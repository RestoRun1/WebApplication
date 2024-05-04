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
            console.log("DEBUG")
            const response = await axios.get<Event[]>(`${this.standardPath}/retrieveAllEvents`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve all events');
        }
    }

    public async retrieveEventById(id: string): Promise<Event> {
        try {
            const response = await axios.get<Event>(`${this.standardPath}/retrieveEventById/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to retrieve meal with ID ${id}`);
        }
    }

    public async saveEvent(event: Event): Promise<Event> {
        try {
            const response = await axios.post<Event>(`${this.standardPath}/saveEvent`, event);
            return response.data;
        } catch (error) {
            throw new Error('Failed to save event');
        }
    }

    public async deleteEvent(id: string): Promise<void> {
        try {
            await axios.delete(`${this.standardPath}/deleteEvent/${id}`);
        } catch (error) {
            throw new Error(`Failed to delete event with ID ${id}`);
        }
    }
}

export default EventsAPI;
