'use client';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import axios from 'axios';


const RestaurantsPage = () => {

    

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [restaurantData, setRestaurantData] = useState([]);

    // use effect to fetch data from the server
    useEffect(() => {

        axios.get('/api/restaurants')
            .then((response) => {
                setRestaurantData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching restaurant data', error);
            });

    }, []);

    

    const actionBodyTemplate = (rowData) => {
        // find me an icon in prime react which represents banning a user and add it to the actionBodyTemplate
        return (
            <div className="actions">
                <Button className="p-button-success" icon="pi pi-pencil" onClick={handleEdit} />
                <Button className="p-button-danger" icon="pi pi-trash" onClick={handleDelete} />
            </div>
        );
    }

    const handleModalToggle = () => {
        setIsModalVisible(!isModalVisible);
    };

    const renderModalContent = () => {

        return (
            <div>
                <Dialog header="Add New Restaurant" visible={isModalVisible} style={{ width: '50vw' }} onHide={handleModalToggle}>
                    <div className="card p-fluid">
                        <div className="field">
                            <label htmlFor="name1">Name</label>
                            <InputText id="name1" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="field">
                            <label htmlFor='address'>Address</label>
                            <InputText id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="field">
                            <label htmlFor="email1">Email</label>
                            <InputText id="email1" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="field">
                            <label htmlFor="phone">Phone</label>
                            <InputText id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
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
        const data = {
            name: name,
            address: address,
            email: email,
            phone: phone
        };
    
        try {
            // Replace 'your-backend-endpoint' with the actual endpoint where you want to send the data
            const response = await axios.post('your-backend-endpoint', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Data sent successfully:', response.data);
            handleModalToggle(); // Close the modal if the request is successful
            // Optionally, reset form fields or perform other actions upon success
        } catch (error) {
            console.error('Error sending data:', error);
            // Handle errors (e.g., show an error message)
        }
    };

    // Example handler functions for actions
    const handleEdit = (rowData) => {
        console.log('Edit action for:', rowData);
        // Implement your edit logic here
    };

    const handleDelete = (rowData) => {
        console.log('Delete action for:', rowData);
        // Implement your delete logic here
    };

    
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <div className="col-6">
                            <h4>Manage Restaurants</h4> 
                    </div>
                        <div className="col-6">
                            <Button label="Add New Restaurant" className="p-button-success" size="small" icon="pi pi-plus" onClick={handleModalToggle} />
                    </div>     
                    {renderModalContent()}
                    <DataTable value={restaurantData} stripedRows style={{ minWidth: '50rem' }}>
                        <Column field="name" header="Name" />
                        <Column field="email" header="Email" />
                        <Column field="phoneNumber" header="Phone" />
                        <Column header="Actions" body={actionBodyTemplate} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default RestaurantsPage;
