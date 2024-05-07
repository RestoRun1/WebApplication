import axios from "axios";

interface Table {
    id: string;
    tableNumber: string;
    seatingCapacity: number;
}

class TableAPI{
    private baseUrl: string;
    private standardPath: string;

    constructor(baseUrl: string){
        this.baseUrl = baseUrl;
        this.standardPath = `${this.baseUrl}/api/dining-table`;
    }

    public async retrieveAllTables(): Promise<Table[]>{
        try{
            const token = localStorage.getItem('token');
            const response = await axios.get<Table[]>(`${this.standardPath}/retrieveAllTables`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        }catch(error){
            throw new Error('Failed to retrieve all tables');
        }
    }

    public async retrieveTableById(id: string): Promise<Table>{
        try{
            const token = localStorage.getItem('token');
            const response = await axios.get<Table>(`${this.standardPath}/retrieveTableById/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        }catch(error){
            throw new Error(`Failed to retrieve table with ID ${id}`);
        }
    }

    public async saveTable(table: Table): Promise<Table>{
        try{
            const token = localStorage.getItem('token');
            const response = await axios.post<Table>(`${this.standardPath}/saveTable`, table, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        }catch(error){
            throw new Error('Failed to save table');
        }
    }

    public async deleteTable(id: string): Promise<void>{
        try{
            const token = localStorage.getItem('token');
            await axios.delete(`${this.standardPath}/deleteTable/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        }catch(error){
            throw new Error(`Failed to delete table with ID ${id}`);
        }
    }

    public async updateTable(table: Table): Promise<void>{
        try{
            const token = localStorage.getItem('token');
            await axios.put(`${this.standardPath}/updateTable`, table, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        }catch(error){
            throw new Error('Failed to update table');
        }
    }
}

export default TableAPI;