'use client';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, {useEffect, useState} from 'react';
import { Button } from 'primereact/button';
import CustomersAPI from "../../../api/admin-api/CustomersAPI";
import RestaurantAPI from "../../../api/admin-api/RestaurantsAPI";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import { ProgressSpinner } from 'primereact/progressspinner';

interface Customer {
    userId: string,
    username: string;
    email: string;
    password: string;
}

const CustomersPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [isEditMode, setIsEditMode] = useState(false);

    const fetchCustomers = async () => {
        // fetch users from the server
        const api = new CustomersAPI('http://localhost:8080');
        try {
            const data = await api.retrieveAllCustomers();
            setCustomers(data);
        } catch (err) {
            setError('Error fetching restaurants');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    const actionBodyTemplate = (rowData: Customer) => {
        // find me an icon in prime react which represents banning a user and add it to the actionBodyTemplate
        return (
            <div className="actions">
                <Button className="p-button-success" icon="pi pi-pencil" onClick={() => handleEdit(rowData)}/>
                <Button className="p-button-danger" icon="pi pi-trash" onClick={() => handleDelete(rowData.userId)}/>
            </div>
        );
    }

    const handleEdit = (rowData: Customer) => {
        setIsEditMode(true);
        setName(rowData.username);
        setEmail(rowData.email);
        setPassword(rowData.password);
        setIsEditMode(true);
        setIsModalVisible(true);
    }

    // add popup to delete operation
    const handleDelete = async (id: string) => {
        const api = new CustomersAPI('http://localhost:8080');
        console.log('Delete action for ID: ', id);
        try {
            await api.deleteCustomer(id);
            fetchCustomers();
        } catch (err) {
            setError('Error deleting customer');
            console.error(err);
        }
    }

    const handleModalToggle = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleSubmit = async () => {
        const api = new CustomersAPI('http://localhost:8080');
        const customer: Customer = {
            userId: '',
            username: name,
            email: email,
            password: password
        };
        try {
            if (isEditMode) {
                await api.saveCustomer(customer);
            } else {
                await api.saveCustomer(customer);
            }
            fetchCustomers();
            setIsModalVisible(false);
        } catch (err) {
            setError('Error saving customer');
            console.error(err);
        }
    }

    const renderModalContent = () => {
        return (
            <div>
                <Dialog
                    header={isEditMode ? "Edit Restaurant" : "Add New Restaurant"}
                    visible={isModalVisible}
                    style={{width: '50vw'}}
                    onHide={() => {
                        handleModalToggle();
                        // Reset edit mode when hiding the modal
                        setIsEditMode(false);
                    }}>
                    <div className="card p-fluid">
                        <div className="p-field">
                            <label htmlFor="name">Name</label>
                            <InputText id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="p-field">
                            <label htmlFor="email">Email</label>
                            <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="p-field">
                            <label htmlFor="password">Password</label>
                            <InputText id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="p-field">
                            <Button label="Submit" onClick={handleSubmit}/>
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h4>Users</h4>
                    <div className="col-6">
                        <Button label="Add New Customer" className="p-button-success" size="small" icon="pi pi-plus"
                                onClick={handleModalToggle}/>
                    </div>
                    {renderModalContent()}
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                            <ProgressSpinner />
                        </div>
                    ) : (
                    <DataTable value={customers} stripedRows tableStyle={{minWidth: '50rem'}}>
                        <Column field="userId" header="ID"></Column>
                        <Column field="username" header="Name"></Column>
                        <Column field="email" header="Email"></Column>
                        <Column header="Actions" body={actionBodyTemplate}/>
                    </DataTable>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomersPage;
