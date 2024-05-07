'use client';

import React, {useEffect, useState} from "react";
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ReservationsAPI from "../../../api/restaurant-api/ReservationsAPI";
import { Dialog } from "primereact/dialog";
import {InputNumber} from "primereact/inputnumber";
import {Tag} from "primereact/tag";
import {Card} from "primereact/card";
import { render } from "sass";

interface Reservation {
    id: string;
    table: Table;
    customer: string;
    reservationTime: Date;
    numberOfGuests: number;
    specialRequests: string;
    status: string;
}

interface Table {
    id: string;
    tableNumber: string;
    seatingCapacity: number;
}

interface Customer {
    userId: string,
    username: string;
    email: string;
    password: string;
}

const ManagerReservationsPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    const [seatingCapacity, setSeatingCapacity] = useState(0);
    const [table, setTable] = useState<Table | null>(null);

   
    const [status, setStatus] = useState<string>('');
    const [reservations, setReservations] = useState<Reservation[]>([]);


    const [customerId, setCustomerId] = useState<number | null>();
    const [reservationTime, setReservationTime] = useState<Date | null>(new Date());
    const [numberOfGuests, setNumberOfGuests] = useState<number | null>();
    const [specialRequests, setSpecialRequests] = useState<string>();
    const [tableNumber, setTableNumber] = useState<number | null>();

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [isEditMode, setIsEditMode] = useState(false);

    const [dateFrom, setDateFrom] = useState<Date | null>(null);
    const [dateTo, setDateTo] = useState<Date | null>(null);

    const [expandedRows, setExpandedRows] = useState({});



    const fetchReservations = async () => {
        // fetch users from the server
        const api = new ReservationsAPI('http://localhost:8080');
        try {
            const data = await api.retrieveAllReservations();
            setReservations(data);
        } catch (err) {
            setError('Error fetching reservations');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchReservations();
    }, []);

    const actionBodyTemplate = (rowData: Reservation) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => handleEdit(rowData)} />
                <Button icon="pi pi-trash" rounded severity="danger" onClick={() => handleDelete(rowData.id)} />
            </>
        );
    };

    const renderModalContent = (rowData) => {
        console.log('Row data: ', rowData);
        return (
            <Dialog header="New Reservation" visible={isModalVisible} style={{ width: '50vw' }} onHide={handleModalToggle}>
                <div className="card p-fluid">
                    <div className="field">
                        <label htmlFor="customerId">Customer ID</label>
                        <InputText id="customerId" type="number" value={customerId || ''} onChange={(e) => setCustomerId(e.target.value ? parseInt(e.target.value) : null)} />
                    </div>
                    <div className="field">
                        <label htmlFor="tableId">Table ID</label>
                        <InputText id="tableId" type="number" value={tableNumber || ''} onChange={(e) => setTableNumber(e.target.value ? parseInt(e.target.value) : null)} />
                    </div>
                    <div className="field">
                        <label htmlFor="reservationTime">Reservation Time</label>
                        <Calendar id="reservationTime" value={reservationTime} onChange={(e) => setReservationTime(e.value)} />
                    </div>
                    <div className="field">
                        <label htmlFor="numberOfGuests">Number of Guests</label>
                        <InputText id="numberOfGuests" type="number" value={numberOfGuests || ''} onChange={(e) => setNumberOfGuests(e.target.value ? parseInt(e.target.value) : null)} />
                    </div>
                    <div className="field">
                        <label htmlFor="specialRequests">Special Requests</label>
                        <InputText id="specialRequests" type="text" value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} />
                    </div>
                    <div className="field">
                        <label htmlFor="restaurantId">Restaurant ID</label>
                        <InputText id="restaurantId" type="text" />
                    </div>
                    <div className="field">
                        <Button label="Submit" className="p-button-success" size="small" icon="pi pi-check" onClick={handleSubmit}/>
                    </div>
                </div>
            </Dialog>
        );
    };

    const handleEdit = (rowData: Reservation) => {
        setIsEditMode(true);
        
        setIsEditMode(true);
        setIsModalVisible(true);
    }

    const handleDelete = async (id: string) => {
        const api = new ReservationsAPI('http://localhost:8080');
        console.log('Delete action for ID: ', id);
        try {
            await api.deleteReservation(id);
            fetchReservations();
        } catch (err) {
            setError('Error deleting reservation');
            console.error(err);
        }
    }

    const handleModalToggle = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleSubmit = async () => {
        const api = new ReservationsAPI('http://localhost:8080');
        const reservation: Reservation = {
            id: '',
            // Fix this.
        };
        if (isEditMode) {
            try {
                await api.saveReservation(reservation);
                fetchReservations();
                setIsModalVisible(false);
            } catch (err) {
                setError('Error saving reservation');
                console.error(err);
            }
        } else {
            try {
                await api.saveReservation(reservation);
                fetchReservations();
            } catch (err) {
                setError('Error saving reservation');
                console.error(err);
            }
        }
    }

    const convertDateToString = (date: Date) => {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    const onRowToggle = (event) => {
        setExpandedRows(event.data);
    };

    const rowExpansionTemplate = (rowData) => {
        return (
            <Card title={`Reservation Details for ID: ${rowData.id}`} style={{ marginBottom: '20px' }} className="reservation-details-card">
                <div className="p-grid">
                    <div className="p-col-12">
                        <label><strong>Reservation Time:</strong></label>
                        <p>{rowData.reservationTime}</p>
                    </div>
                    <div className="p-col-12">
                        <label><strong>Number of Guests:</strong></label>
                        <p>{rowData.numberOfGuests}</p>
                    </div>
                    <div className="p-col-12">
                        <label><strong>Special Requests:</strong></label>
                        <p>{rowData.specialRequests}</p>
                    </div>
                    <div className="p-col-12">
                        <label><strong>Table ID:</strong></label>
                        <p>{rowData.tableId}</p>
                    </div>
                    <div className="p-col-12">
                        <label><strong>Customer ID:</strong></label>
                        <p>{rowData.customerId}</p>
                    </div>
                </div>
            </Card>
        );
    };
    

    
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <div className="col-6">
                    <h4>Reservations</h4>
                    <Button label="Add New Reservation" className="p-button-success" size="small" icon="pi pi-plus" onClick={handleModalToggle} />
                    </div>
                    <div className="grid">
                        <div className="col-12">
                            {renderModalContent(reservations[0])}
                            <DataTable value={reservations} expandedRows={expandedRows} onRowToggle={onRowToggle}
                                               rowExpansionTemplate={rowExpansionTemplate} dataKey="id">
                                <Column expander style={{ width: '3em' }} />
                                <Column field="id" header="Order ID" />
                                <Column field="tableId" header="TableId" />
                                <Column field="actions" header="Actions" body={actionBodyTemplate} />
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    
};

export default ManagerReservationsPage;


/*

const renderModalContent = () => {
        return (
            <div>
                <Dialog visible={isModalVisible} onHide={handleModalToggle}>
                    <div className="grid">
                        <div className="col-12">
                            <h4>{isEditMode ? 'Edit Reservation' : 'Add Reservation'}</h4>
                            <div className="field grid">
                                <label htmlFor="table" className="col-12 mb-2 md:col-2 md:mb-0">
                                    Table
                                </label>
                                <div className="col-12 md:col-10">
                                    <InputText id="table" value={table?.id} onChange={(e) => setTable({ ...table, id: e.target.value })} />
                                </div>
                            </div>
                            <div className="field grid">
                                <label htmlFor="customer" className="col-12 mb-2 md:col-2 md:mb-0">
                                    Customer
                                </label>
                                <div className="col-12 md:col-10">
                                    <InputText id="customer" value={customer?.username} onChange={(e) => setCustomer({ ...customer, username: e.target.value })} />
                                </div>
                            </div>
                            <div className="field grid">
                                <label htmlFor="reservationTime" className="col-12 mb-2 md:col-2 md:mb-0">
                                    Reservation Time
                                </label>
                                <div className="col-12 md:col-10">
                                    <Calendar id="reservationTime" value={reservationTime} onChange={(e) => setReservationTime(e.value as Date)} showIcon />
                                </div>
                            </div>
                            <div className="field grid">
                                <label htmlFor="numberOfGuests" className="col-12 mb-2 md:col-2 md:mb-0">
                                    Number of Guests
                                </label>
                                <div className="col-12 md:col-10">
                                    <InputNumber id="numberOfGuests" value={numberOfGuests} onChange={(e) => setNumberOfGuests(parseInt(e.target.value))} />
                                </div>
                            </div>
                            <div className="field grid">
                                <label htmlFor="specialRequests" className="col-12 mb-2 md:col-2 md:mb-0">
                                    Special Requests
                                </label>
                                <div className="col-12 md:col-10">
                                    <InputText id="specialRequests" value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} />
                                </div>
                            </div>
                            <div className="field grid">
                                <label htmlFor="status" className="col-12 mb-2 md:col-2 md:mb-0">
                                    Status
                                </label>
                                <div className="col-12 md:col-10">
                                    <InputText id="status" value={status} onChange={(e) => setStatus(e.target.value)} />
                                </div>
                            </div>
                            <div className="field grid">
                                <Button label="Submit" onClick={handleSubmit} />
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }

*/