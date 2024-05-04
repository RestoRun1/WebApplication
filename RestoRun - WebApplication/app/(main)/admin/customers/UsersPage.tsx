'use client';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import axios from 'axios';
import CustomersAPI from '../../../api/admin-api/CustomersAPI';

interface Customer {
    id: string,
    username: string;
    email: string;
    password: string;
}

const CustomersPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    // will change Role to role later
    const [role, setRole] = useState('');

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [isEditMode, setIsEditMode] = useState(false);

    const fetchCustomers = async () => {
        const api = new CustomersAPI('http://localhost:8080');
        try {
            const data = await api.retrieveAllCustomers();
            setCustomers(data);
        } catch (err) {
            setError('Error fetching customers');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // use effect to fetch data from the server. the endpoints are listed in CustomerAPI.tsx
    useEffect(() => {
        fetchCustomers();
    }, []);

    const actionBodyTemplate = (rowData: Customer) => {
        // find me an icon in prime react which represents banning a customer and add it to the actionBodyTemplate
        return (
            <div className="actions">
            <Button className="p-button-success" icon="pi pi-pencil" onClick={() => handleEdit(rowData)} />
        <Button className="p-button-danger" icon="pi pi-trash" onClick={() => handleDelete(rowData.id)} />
        </div>
    );
    }

    const handleModalToggle = () => {
        setIsModalVisible(!isModalVisible);
    };

    const renderModalContent = () => {
        return (
            <div>
                <Dialog
                    header={isEditMode ? "Edit Customer" : "Add New Customer"}
        visible={isModalVisible}
        style={{ width: '50vw' }}
        onHide={() => {
            handleModalToggle();
            // Reset edit mode when hiding the modal
            setIsEditMode(false);
        }}>
        <div className="card p-fluid">
        <div className="field">
        <label htmlFor="name1">Name</label>
            <InputText id="name1" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="field">
        <label htmlFor="email1">Email</label>
            <InputText id="email1" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
        <label htmlFor="role">Phone</label>
            <InputText id="role" type="text" value={role} onChange={(e) => setRole(e.target.value)} />
        </div>
        <div className="field">
        <Button label="Submit" className="p-button-success" size="small" icon="pi pi-check" onClick={handleSubmit} />
        </div>
        </div>
        </Dialog>
        </div>
    );
    }

    const handleSubmit = async () => {

        const api = new CustomersAPI('http://localhost:8080');

        // Construct the customer object
        const customer: Customer = {
            id: '',
            username: username,
            email: email,
            password: password,
        };

        try {
            // Call the API to save the customer
            const response = await api.saveCustomer(customer);
            console.log(response); // Or handle the successful save as needed
            setIsModalVisible(false); // Close the modal on success
            // You might want to refresh your customer list here or emit an event that causes a parent component to do so
        } catch (error) {
            console.error('Failed to save customer:', error);
            // Handle the error state in the UI, such as displaying an error message
        }
    };

    // Example handler functions for actions
    const handleEdit = (rowData: Customer) => {
        console.log('Edit action for:', rowData);

        setUsername(rowData.username);
        setEmail(rowData.email);
        setPassword(rowData.password);
        setIsEditMode(true);  // Set edit mode to true
        setIsModalVisible(true);
    };


    const handleDelete = async (id: string) => {
        const api = new CustomersAPI('http://localhost:8080');
        console.log('Delete action for ID:', id);

        if (!id) {
            console.error('Error: No valid customer ID provided for deletion.');
            return;
        }

        try {
            // Call deleteCustomer from your API class
            await api.deleteCustomer(id);
            console.log('Customer deleted successfully');

            // Optionally, refresh the list of customers or update the UI accordingly
            fetchCustomers();

        } catch (error) {
            console.error('Failed to delete customer:', error); // Improved error logging
            // Optionally, handle UI feedback for the error
        }
    };


    return (
        <div className="grid">
        <div className="col-12">
        <div className="card">
        <div className="col-6">
            <h4>Manage Customers</h4>
    </div>
    <div className="col-6">
    <Button label="Add New Customer" className="p-button-success" size="small" icon="pi pi-plus" onClick={handleModalToggle} />
    </div>
    {renderModalContent()}
    <DataTable value={customers} stripedRows style={{ minWidth: '50rem' }}>

    <Column field="name" header="Name" />
    <Column field="email" header="Email" />
    <Column field="address" header="Address" />
    <Column field="phoneNumber" header="Phone" />
    <Column header="Actions" body={actionBodyTemplate} />
    </DataTable>
    </div>
    </div>
    </div>
);
};

export default CustomersPage;
