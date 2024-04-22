import axios from 'axios';

interface Reservation {
    id: string;
    name: string;
    description: string;
    location: string;
    reservationDetails: ReservationDetail[];
}

interface ReservationDetail {
    id: string;
    type: string;
    start: string;
    end: string;
    numberOfGuests: number;
}

class ReservationAPI {
    private baseUrl: string;
    private standardPath: string;
    private axiosInstance = axios.create();

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.standardPath = `${this.baseUrl}/api/reservations`;
    }

    private handleError(error: any): string {
        return 'Error occurred';
    }

    private handleResponse(response: any): any {
        return response.data;
    }

    public async retrieveReservations(): Promise<Reservation[]> {
        try {
            const response = await this.axiosInstance.get<Reservation[]>(`${this.standardPath}/retrieveAllReservations`);
            return this.handleResponse(response);
        } catch (error) {
            throw new Error(this.handleError(error));
        }
    }

    public async retrieveReservationById(id: string): Promise<Reservation> {
        try {
            const response = await this.axiosInstance.get<Reservation>(`${this.standardPath}/retrieveReservationById/${id}`);
            return this.handleResponse(response);
        } catch (error) {
            throw new Error(this.handleError(error));
        }
    }

    public async saveReservation(reservation: Reservation): Promise<Reservation> {
        try {
            const response = await this.axiosInstance.post<Reservation>(`${this.standardPath}/saveReservation`, reservation);
            return response.data;
        } catch (error) {
            throw new Error('Failed to save reservation');
        }
    }

    public async deleteReservation(id: string): Promise<void> {
        try {
            await this.axiosInstance.delete(`${this.standardPath}/deleteReservation/${id}`);
        } catch (error) {
            throw new Error(`Failed to delete reservation with ID ${id}`);
        }
    }
}
