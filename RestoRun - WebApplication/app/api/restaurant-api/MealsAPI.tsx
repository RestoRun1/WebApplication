import axios from "axios";
import exp from "node:constants";

// @TODO CHANGE MEALS TO MEAL
interface Meals{
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    rating: number;
}

class MealsAPI {
    private baseUrl: string;
    private standardPath: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.standardPath = `${this.baseUrl}/api/meal`;
    }

    public async saveMeal(meal: Meals): Promise<Meals> {
        try {
            const response = await axios.post<Meals>(`${this.standardPath}/saveMeal`, meal);
            return response.data;
        } catch (error) {
            throw new Error('Failed to save meal');
        }
    }

    public async retrieveMealById(id: string): Promise<Meals> {
        try {
            const response = await axios.get<Meals>(`${this.standardPath}/retrieveMealById/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to retrieve meal with ID ${id}`);
        }
    }

    // add token that was stored in the local storage to the header
    public async retrieveAllMeals(): Promise<Meals[]> {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get<Meals[]>(`${this.standardPath}/retrieveAllMeals`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to retrieve all meals');
        }
    }

    public async deleteMeal(id: string): Promise<void> {
        try {
            await axios.delete(`${this.standardPath}/deleteMeal/${id}`);
        } catch (error) {
            throw new Error(`Failed to delete meal with ID ${id}`);
        }
    }
}

export default MealsAPI;

/*try {
const response = await axios.get<Meals[]>(`${this.standardPath}/retrieveAllMeals`);
return response.data;
} catch (error) {
throw new Error('Failed to retrieve all meals');
}*/