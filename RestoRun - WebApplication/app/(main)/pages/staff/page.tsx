'use client';
import React, {useState} from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
        


const StaffPage = () => {

    const employees = [
        {"Employee ID": 7103, "Email": "wilsondana@thomas.org", "Person Name": "Ryan Silva", "Date Joined": "2023-04-14"},
        {"Employee ID": 9260, "Email": "todd23@hotmail.com", "Person Name": "Reginald Taylor", "Date Joined": "2019-07-09"},
        {"Employee ID": 2183, "Email": "matthew83@bass.com", "Person Name": "Rebecca Miller", "Date Joined": "2021-08-09"},
        {"Employee ID": 5562, "Email": "amywalters@holloway.com", "Person Name": "Mark Jordan", "Date Joined": "2023-08-27"},
        {"Employee ID": 7616, "Email": "kellysmith@yahoo.com", "Person Name": "Nicole York", "Date Joined": "2020-05-07"},
        {"Employee ID": 4591, "Email": "phillipmay@reeves.com", "Person Name": "David Klein", "Date Joined": "2021-10-25"},
        {"Employee ID": 6120, "Email": "ojones@gmail.com", "Person Name": "Kristen Thomas", "Date Joined": "2019-10-04"},
        {"Employee ID": 2901, "Email": "ricksantos@yahoo.com", "Person Name": "Steven Collins", "Date Joined": "2019-12-17"},
        {"Employee ID": 8161, "Email": "jonathancolon@oneal.com", "Person Name": "Theresa Phillips", "Date Joined": "2023-06-27"},
        {"Employee ID": 9845, "Email": "jenniferwatkins@hotmail.com", "Person Name": "Monica Howard", "Date Joined": "2021-10-31"}
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
                <Dialog header="Add New Employee" visible={isModalVisible} style={{ width: '50vw' }} onHide={handleModalToggle}>
                    <div className="card p-fluid">
                        <div className="field">
                            <label htmlFor="name1">Name</label>
                            <InputText id="name1" type="text" />
                        </div>
                        <div className="field">
                            <label htmlFor="email1">Email</label>
                            <InputText id="email1" type="text" />
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
                            <h4>Staff Management</h4> 
                    </div>
                        <div className="col-6">
                            <Button label="Add New Employee" className="p-button-success" size="small" icon="pi pi-plus" onClick={handleModalToggle} />
                    </div>                    
                    {renderModalContent()}
                    <DataTable value={employees}>
                        <Column field="Employee ID" header="Employee ID"></Column>
                        <Column field="Email" header="Email"></Column>
                        <Column field="Person Name" header="Person Name"></Column>
                        <Column field="Date Joined" header="Date Joined"></Column>
                        <Column header="Actions" body={actionBodyTemplate} />
                    </DataTable>
                </div>
            </div>
        </div>
    );

};

export default StaffPage;
