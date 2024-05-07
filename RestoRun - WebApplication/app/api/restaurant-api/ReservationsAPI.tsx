import axios from 'axios';

interface Reservation {
    id: string;
    table: Table;
    customer: Customer;
    reservationTime: Date;
    numberOfGuests: number;
    specialRequests: string;
    status: string;
}

interface Table {
    id: string;
    tableNumber: string;
    seatingCapacity: number;
}

interface Customer {
    userId: string,
    username: string;
    email: string;
    password: string;
}

class ReservationAPI {
    private baseUrl: string;
    private standardPath: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.standardPath = `${this.baseUrl}/api/reservation`;
    }

    public async retrieveAllReservations(): Promise<Reservation[]> {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get<Reservation[]>(`${this.standardPath}/retrieveAllReservations`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve all reservations');
        }
    }

    public async saveReservation(reservation: Reservation): Promise<Reservation> {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post<Reservation>(`${this.standardPath}/saveReservation`, reservation, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to save reservation');
        }
    }

    public async retrieveReservationById(id: string): Promise<Reservation> {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get<Reservation>(`${this.standardPath}/retrieveReservationById/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(`Failed to retrieve reservation with ID ${id}`);
        }
    }

    public async deleteReservation(id: string): Promise<void> {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${this.standardPath}/deleteReservation/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            throw new Error(`Failed to delete reservation with ID ${id}`);
        }
    }
}

export default ReservationAPI;