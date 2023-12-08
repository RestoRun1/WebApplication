'use client';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React from 'react';
import { Button } from 'primereact/button';


const UsersPage = () => {

    const users = [
        {"customerID": 1683, "Name": "Brent Davis", "Email": "deborah29@padilla.info", "NumberOfReservations": 12},
        {"customerID": 8371, "Name": "Dr. Zachary Hickman", "Email": "hatfieldmark@pope.com", "NumberOfReservations": 4},
        {"customerID": 4764, "Name": "Robert Atkins DDS", "Email": "ksnow@powers.com", "NumberOfReservations": 17},
        {"customerID": 1289, "Name": "Sarah Rodriguez", "Email": "juarezsharon@miller-martinez.com", "NumberOfReservations": 13},
        {"customerID": 9094, "Name": "Cindy Allen", "Email": "ggardner@yahoo.com", "NumberOfReservations": 12},
        {"customerID": 7408, "Name": "Michael Simpson", "Email": "ronald56@yahoo.com", "NumberOfReservations": 8},
        {"customerID": 8391, "Name": "Charlene Wiggins", "Email": "kellyweaver@scott-terrell.biz", "NumberOfReservations": 0},
        {"customerID": 1909, "Name": "Raymond Powers", "Email": "thompsoncharles@ramsey.com", "NumberOfReservations": 10},
        {"customerID": 6967, "Name": "Nicholas Nguyen", "Email": "ricejohn@juarez-flynn.com", "NumberOfReservations": 1},
        {"customerID": 7120, "Name": "Steven Zimmerman", "Email": "traci16@hotmail.com", "NumberOfReservations": 12},
        {"customerID": 9024, "Name": "Valerie Russell", "Email": "rmyers@lopez-brown.org", "NumberOfReservations": 4},
        {"customerID": 4978, "Name": "Derek Moore", "Email": "bryantjason@glenn-fox.net", "NumberOfReservations": 4},
        {"customerID": 6052, "Name": "Pamela Strickland", "Email": "hendricksjohn@hotmail.com", "NumberOfReservations": 7},
        {"customerID": 2808, "Name": "Michelle Smith", "Email": "cynthiamartin@robinson.com", "NumberOfReservations": 3},
        {"customerID": 8456, "Name": "Phillip Barton", "Email": "qlong@thompson.com", "NumberOfReservations": 0},
        {"customerID": 1176, "Name": "Kathleen Thornton", "Email": "sayers@hotmail.com", "NumberOfReservations": 15},
        {"customerID": 3735, "Name": "Katherine Cardenas", "Email": "williamsjoseph@gmail.com", "NumberOfReservations": 0},
        {"customerID": 8860, "Name": "Kenneth Ingram", "Email": "bookerkristina@schneider.biz", "NumberOfReservations": 19},
        {"customerID": 8192, "Name": "Danielle Morse", "Email": "hlawrence@rogers.com", "NumberOfReservations": 8},
        {"customerID": 7977, "Name": "Christopher Flowers", "Email": "thomasmatthew@russo.biz", "NumberOfReservations": 10},
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
                    <h4>Users</h4>
                    <DataTable value={users} stripedRows tableStyle={{minWidth: '50rem'}}>
                        <Column field="Name" header="Name"></Column>
                        <Column field="Email" header="Email"></Column>
                        <Column field="NumberOfReservations" header="Number of Reservations"></Column>
                        <Column header="Actions" body={actionBodyTemplate} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default UsersPage;
