'use client';
import React, {useState} from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { ProgressSpinner } from 'primereact/progressspinner';
import EmployeeAPI from '../../../api/restaurant-api/EmployeeAPI';
import { useEffect } from 'react';

interface Employee {
    userId: string;
    username: string;
    role: string;
    email: string;
    startDate: Date;
}


const StaffPage = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [startDate, setStartDate] = useState<Date>(new Date());


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [isEditMode, setIsEditMode] = useState(false);


    // the id string is restaurant id in here
    const fetchEmployees = async (id: string) => {

        const employeeAPI = new EmployeeAPI('http://localhost:8080');
        try {
            setLoading(true);
            const employees = await employeeAPI.retrieveAllEmployeesByRestaurantId("1");
            setEmployees(employees);
        } catch (error) {
            setError("Failed to retrieve employees");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchEmployees("1");
    }, []);

    const handleModalToggle = () => {
        setIsModalVisible(!isModalVisible);
    };

    const actionBodyTemplate = (rowData: Employee) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => handleEdit(rowData)} />
                <Button icon="pi pi-trash" rounded severity="danger" onClick={() => handleDelete(rowData.id)} />
            </>
        );
    }


    const renderModalContent = () => {
        return (
            <div>
                <Dialog header="Add New Employee" visible={isModalVisible} style={{ width: '50vw' }} onHide={handleModalToggle}>
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="username">Username</label>
                            <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="p-field">
                            <label htmlFor="role">Role</label>
                            <InputText id="role" value={role} onChange={(e) => setRole(e.target.value)} />
                        </div>
                        <div className="p-field">
                            <label htmlFor="email">Email</label>
                            <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="p-field">
                            <label htmlFor="startDate">Start Date</label>
                            <Calendar id="startDate" value={startDate} onChange={(e) => setStartDate(e.value)} />
                        </div>
                        <div className="p-field">
                            <Button label="Save" className="p-button-success" onClick={handleModalToggle} />
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    };
    

    // Edit action handler
    const handleEdit = (rowData: Employee) => {
        console.log("Edit Action for: ", rowData);
        // Add your edit logic here
        setUsername(rowData.username);
        setRole(rowData.role);
        setEmail(rowData.email);
        setStartDate(rowData.startDate);
        setIsModalVisible(true);       
    };

    // Delete action handler
    const handleDelete = async (id: string) => {

        const api = new EmployeeAPI('http://localhost:8080');

        if (!id) {
            console.error('Error: No valid employee ID provided for deletion.');
            return;
        }
        try {
            await api.deleteEmployee(id);
            fetchEmployees("1");
        }
        catch (error) {
            console.error('Failed to delete employee with ID: ', id);
        }
    }

    const handleSubmit = async () => {
        const api = new EmployeeAPI('http://localhost:8080');
        try {
            await api.saveEmployee({
                userId: '',
                username: username,
                role: role,
                email: email,
                startDate: startDate
            });
            fetchEmployees("1");
            handleModalToggle();
        } catch (error) {
            console.error('Failed to save employee');
        }
    }




    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <div className="col-6">
                            <h4>Staff Management</h4> 
                    </div>
                        <div className="col-6">
                            <Button label="Add New Employee" className="p-button-success" size="small" icon="pi pi-plus" onClick={handleModalToggle} />
                    </div>                    
                    {renderModalContent()}
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                            <ProgressSpinner />
                        </div>
                    ) : (
                        <DataTable value={employees}>
                            <Column field="Employee ID" header="Employee ID"></Column>
                            <Column field="Email" header="Email"></Column>
                            <Column field="Person Name" header="Person Name"></Column>
                            <Column field="Role" header="Role"></Column>
                            <Column field="Date Joined" header="Date Joined"></Column>
                            <Column header="Actions" body={actionBodyTemplate} />
                        </DataTable>
                    )}
                </div>
            </div>
        </div>
    );

};

export default StaffPage;
