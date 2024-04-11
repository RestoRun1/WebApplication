'use client';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React from 'react';
import { Button } from 'primereact/button';


const RestaurantsPage = () => {

    const restaurants = [
        {"customerID": 1683, "Name": "Pizza Locale", "Email": "pizzalocale@gmail.com", "NumberOfReservations": "+905533243686"},
        {"customerID": 8371, "Name": "Hmbrgr", "Email": "hmbrgr@gmail.com", "NumberOfReservations": "+905344371314"},
        {"customerID": 4764, "Name": "Piel Roja", "Email": "pielroja@gmail.com", "NumberOfReservations": "+905059112361"},
        {"customerID": 1289, "Name": "Fameo", "Email": "fameo@gmail.com", "NumberOfReservations": "+905019327686"},
    ];

    const actionBodyTemplate = (rowData) => {
        // find me an icon in prime react which represents banning a user and add it to the actionBodyTemplate
        return (
            <div className="actions">
                <Button className="p-button-success" icon="pi pi-pencil" />
                <Button className="p-button-danger" icon="pi pi-trash" />
                <Button className="p-button-info" icon="pi pi-ban" />
            </div>
        );
    }

    
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h4>Restaurants</h4>
                    <DataTable value={restaurants} stripedRows tableStyle={{minWidth: '50rem'}}>
                        <Column field="Name" header="Name"></Column>
                        <Column field="Email" header="Email"></Column>
                        <Column field="NumberOfReservations" header="Private Mobile Phone"></Column>
                        <Column header="Actions" body={actionBodyTemplate} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default RestaurantsPage;
