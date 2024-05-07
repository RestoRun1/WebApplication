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
      const token = localStorage.getItem('token');
      const response = await axios.post<Restaurant>(`${this.standardPath}/saveRestaurant`, restaurant, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
      return response.data;
    } catch (error) {
      throw new Error('Failed to save restaurant');
    }
  }

  // Retrieve a restaurant by ID
  public async retrieveRestaurantById(id: string): Promise<Restaurant> {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<Restaurant>(`${this.standardPath}/retrieveRestaurantById/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to retrieve restaurant with ID ${id}`);
    }
  }

  // Retrieve all restaurants
  public async retrieveAllRestaurants(): Promise<Restaurant[]> {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<Restaurant[]>(`${this.standardPath}/retrieveAllRestaurants`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
      return response.data;
    } catch (error) {
      throw new Error('Failed to retrieve all restaurants');
    }
  }

  // Delete a restaurant
  public async deleteRestaurant(id: string): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${this.standardPath}/deleteRestaurant/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    } catch (error) {
      throw new Error(`Failed to delete restaurant with ID ${id}`);
    }
  }
}

export default RestaurantAPI;
