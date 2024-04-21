'use client';
import React, {useState} from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
        
const EventsPage = () => {

    const employees = [
        {"Employee ID": 7103, "Email": "Buy 1 Get 1 on Chicken Products", "Person Name": "If you buy a chicken dish, you will be provided with another one on the house.", "Date Joined": "2023-04-14"},
        {"Employee ID": 9260, "Email": "Get 50% Discount!", "Person Name": "First meal you order with RestoRun will be 50% off!", "Date Joined": "2019-07-09"},
    ]; 

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [date, setDate] = useState(null);

    // ... (rest of your code, like the employees array and actionBodyTemplate)

    const handleModalToggle = () => {
        setIsModalVisible(!isModalVisible);
    };

    const renderModalContent = () => {
        return (
            <div>
                <Dialog header="Add New Event" visible={isModalVisible} style={{ width: '50vw' }} onHide={handleModalToggle}>
                    <div className="card p-fluid">
                        <div className="field">
                            <label htmlFor="name1">Name of the Event</label>
                            <InputText id="name1" type="text" />
                        </div>
                        <div className="field">
                            <label htmlFor="desc">Description</label>
                            <InputText id="desc" type="text" />
                        </div>
                        <div className="field">
                            <label htmlFor="date">Start Date</label>
                            <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon />
                        </div>
                        <div className="field">
                            <Button label="Submit" className="p-button-success" size="small" icon="pi pi-check" onClick={handleModalToggle} />
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    };
    
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-check" className="p-button-success" size="small" onClick={() => handleEdit(rowData)} />
                <Button icon="pi pi-trash"  className="p-button-danger" size="small" style={{ marginLeft: '0.5em' }} onClick={() => handleDelete(rowData)}/>
            </React.Fragment>
        );
    };

    // Edit action handler
    const handleEdit = (rowData) => {
        console.log("Edit Action for: ", rowData);
        // Add your edit logic here
    };

    // Delete action handler
    const handleDelete = (rowData) => {
        console.log("Delete Action for: ", rowData);
        // Add your delete logic here
    };


    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <div className="col-6">
                            <h4>Events</h4> 
                    </div>
                        <div className="col-6">
                            <Button label="Add New Event" className="p-button-success" size="small" icon="pi pi-plus" onClick={handleModalToggle} />
                    </div>                    
                    {renderModalContent()}
                    <DataTable value={employees}>
                        <Column field="Employee ID" header="Event ID"></Column>
                        <Column field="Email" header="Event Name"></Column>
                        <Column field="Person Name" header="Event Description"></Column>
                        <Column field="Date Joined" header="End Date"></Column>
                        <Column header="Actions" body={actionBodyTemplate} />
                    </DataTable>
                </div>
            </div>
        </div>
    );

};

export default EventsPage;
