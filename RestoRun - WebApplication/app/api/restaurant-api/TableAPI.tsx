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
            const response = await axios.get<Table[]>(`${this.standardPath}/retrieveAllTables`);
            return response.data;
        }catch(error){
            throw new Error('Failed to retrieve all tables');
        }
    }

    public async retrieveTableById(id: string): Promise<Table>{
        try{
            const response = await axios.get<Table>(`${this.standardPath}/retrieveTableById/${id}`);
            return response.data;
        }catch(error){
            throw new Error(`Failed to retrieve table with ID ${id}`);
        }
    }

    public async saveTable(table: Table): Promise<Table>{
        try{
            const response = await axios.post<Table>(`${this.standardPath}/saveTable`, table);
            return response.data;
        }catch(error){
            throw new Error('Failed to save table');
        }
    }

    public async deleteTable(id: string): Promise<void>{
        try{
            await axios.delete(`${this.standardPath}/deleteTable/${id}`);
        }catch(error){
            throw new Error(`Failed to delete table with ID ${id}`);
        }
    }

    public async updateTable(table: Table): Promise<void>{
        try{
            await axios.put(`${this.standardPath}/updateTable`, table);
        }catch(error){
            throw new Error('Failed to update table');
        }
    }
}

export default TableAPI;