
import axios from 'axios';

interface Restaurant {
    id: string,
    name: string;
    address: string;
    email: string;
    phoneNumber: string;
}

class RestaurantAPI {
  private baseUrl: string;
  private standardPath: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.standardPath = `${this.baseUrl}/api/restaurant`;
  }

  // Save a new restaurant
  public async saveRestaurant(restaurant: Restaurant): Promise<Restaurant> {
    try {
      const response = await axios.post<Restaurant>(`${this.standardPath}/saveRestaurant`, restaurant);
      return response.data;
    } catch (error) {
      throw new Error('Failed to save restaurant');
    }
  }

  // Retrieve a restaurant by ID
  public async retrieveRestaurantById(id: string): Promise<Restaurant> {
    try {
      const response = await axios.get<Restaurant>(`${this.standardPath}/retrieveRestaurantById/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to retrieve restaurant with ID ${id}`);
    }
  }

  // Retrieve all restaurants
  public async retrieveAllRestaurants(): Promise<Restaurant[]> {
    try {
      const response = await axios.get<Restaurant[]>(`${this.standardPath}/retrieveAllRestaurants`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to retrieve all restaurants');
    }
  }

  // Delete a restaurant
  public async deleteRestaurant(id: string): Promise<void> {
    try {
      await axios.delete(`${this.standardPath}/deleteRestaurant/${id}`);
    } catch (error) {
      throw new Error(`Failed to delete restaurant with ID ${id}`);
    }
  }
}

export default RestaurantAPI;
