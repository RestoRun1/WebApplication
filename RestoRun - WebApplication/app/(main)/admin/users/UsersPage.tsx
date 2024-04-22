'use client';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import axios from 'axios';
import UsersAPI from '../../../api/admin-api/UsersAPI';


interface User {
    id: string,
    username: string;
    email: string;
    role: string;
}

const UsersPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    // will change Role to role later
    const [role, setRole] = useState('');

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [isEditMode, setIsEditMode] = useState(false);

    const fetchUsers = async () => {
        const api = new UsersAPI('http://localhost:8080');
        try {
            const data = await api.retrieveAllUsers();
            setUsers(data);
        } catch (err) {
            setError('Error fetching users');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // use effect to fetch data from the server. the endpoints are listed in UserAPI.tsx
    useEffect(() => {
        fetchUsers();
    }, []);

    const actionBodyTemplate = (rowData: User) => {
        // find me an icon in prime react which represents banning a user and add it to the actionBodyTemplate
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
                    header={isEditMode ? "Edit User" : "Add New User"}
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

        const api = new UsersAPI('http://localhost:8080');

        // Construct the user object
        const user: User = {
            id: '',
            username: username,
            email: email,
            role: role,
        };

        try {
            // Call the API to save the user
            const response = await api.saveUser(user);
            console.log(response); // Or handle the successful save as needed
            setIsModalVisible(false); // Close the modal on success
            // You might want to refresh your user list here or emit an event that causes a parent component to do so
        } catch (error) {
            console.error('Failed to save user:', error);
            // Handle the error state in the UI, such as displaying an error message
        }
    };

    // Example handler functions for actions
    const handleEdit = (rowData: User) => {
        console.log('Edit action for:', rowData);

        setUsername(rowData.username);
        setEmail(rowData.email);
        setRole(rowData.role);
        setIsEditMode(true);  // Set edit mode to true
        setIsModalVisible(true);
    };


    const handleDelete = async (id: string) => {
        const api = new UsersAPI('http://localhost:8080');
        console.log('Delete action for ID:', id);

        if (!id) {
            console.error('Error: No valid user ID provided for deletion.');
            return;
        }

        try {
            // Call deleteUser from your API class
            await api.deleteUser(id);
            console.log('User deleted successfully');

            // Optionally, refresh the list of users or update the UI accordingly
            fetchUsers();

        } catch (error) {
            console.error('Failed to delete user:', error); // Improved error logging
            // Optionally, handle UI feedback for the error
        }
    };


    return (
        <div className="grid">
        <div className="col-12">
        <div className="card">
        <div className="col-6">
            <h4>Manage Users</h4>
    </div>
    <div className="col-6">
    <Button label="Add New User" className="p-button-success" size="small" icon="pi pi-plus" onClick={handleModalToggle} />
    </div>
    {renderModalContent()}
    <DataTable value={users} stripedRows style={{ minWidth: '50rem' }}>

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

export default UsersPage;
