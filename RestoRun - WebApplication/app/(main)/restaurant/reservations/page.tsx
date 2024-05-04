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

interface Reservation {
    id: string;
    table: Table;
    customer: Customer;
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

const ReservationsPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tableNumber, setTableNumber] = useState('');
    const [seatingCapacity, setSeatingCapacity] = useState(0);
    const [table, setTable] = useState<Table | null>(null);

    const [customer, setCustomer] = useState<Customer | null>(null);
    const [reservationTime, setReservationTime] = useState<Date | null>(null);
    const [numberOfGuests, setNumberOfGuests] = useState<number>(0);
    const [specialRequests, setSpecialRequests] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [reservations, setReservations] = useState<Reservation[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [isEditMode, setIsEditMode] = useState(false);

    const [dateFrom, setDateFrom] = useState<Date | null>(null);
    const [dateTo, setDateTo] = useState<Date | null>(null);

    const [expandedRows, setExpandedRows] = useState(null);



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
            <div className="actions">
                <Button className="p-button-success" icon="pi pi-pencil" onClick={() => handleEdit(rowData)}/>
                <Button className="p-button-danger" icon="pi pi-trash" onClick={() => handleDelete(rowData.id)}/>
            </div>
        );
    }

    const handleEdit = (rowData: Reservation) => {
        setIsEditMode(true);
        setTable(rowData.table);
        setCustomer(rowData.customer);
        setReservationTime(rowData.reservationTime);
        setNumberOfGuests(rowData.numberOfGuests);
        setSpecialRequests(rowData.specialRequests);
        setStatus(rowData.status);
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
            table: table as Table,
            customer: customer as Customer,
            reservationTime: reservationTime as Date,
            numberOfGuests: numberOfGuests,
            specialRequests: specialRequests,
            status: status,
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

    const rowExpansionTemplate = (rowData: Reservation) => {
        return (
            <div className="reservation-details">
                {/* You can structure your detailed view here */}
                <h5>Reservation Details</h5>
                <div>
                    <p>Table: {rowData.table.tableNumber}</p>
                    <p>Customer: {rowData.customer.username}</p>
                    <p>Reservation Time: {convertDateToString(rowData.reservationTime)}</p>
                    <p>Number of Guests: {rowData.numberOfGuests}</p>
                    <p>Special Requests: {rowData.specialRequests}</p>
                    <p>Status: {rowData.status}</p>
                </div>
                {/* ... other details */}
            </div>
        );
    };

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

    const onRowToggle = (e) => {
        const dataKey = e.data.id; // Assuming 'id' is the unique key in your data
        setExpandedRows(expandedRows === dataKey ? null : dataKey);
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Reservations</h5>
                    <div className="grid">
                        <div className='col-3'>
                            <div className="field grid">
                                <label htmlFor="name3" className="col-12 mb-2 md:col-2 md:mb-0">
                                    From
                                </label>
                                <div className="col-12 md:col-10">
                                    <Calendar value={dateFrom} onChange={(e) => setDateFrom(e.value as Date)} showIcon />
                                </div>
                            </div>
                            <div className="field grid">
                                <label htmlFor="email3" className="col-12 mb-2 md:col-2 md:mb-0">
                                    To
                                </label>
                                <div className="col-12 md:col-10">
                                    <Calendar value={dateTo} onChange={(e) => setDateTo(e.value as Date)} showIcon />
                                </div>
                            </div>
                            <div className="field grid">
                                <Button label="Search" className="p-button-success" style={{ width: '100%' }} />
                            </div>
                            <div className="field grid">
                                <div className="col-12">
                                    <h6>Cancelled: </h6>
                                </div>
                                <div className="col-12">
                                    <h6>Confirmed: </h6>
                                </div>
                                <div className="col-12">
                                    <h6>Abandoned: </h6>
                                </div>
                                <div className="col-12">
                                    <h6>Checked In:</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-9">
                            {renderModalContent()}
                            <DataTable value={reservations} expandedRows={expandedRows ? {[expandedRows]: true} : null}
                                       onRowToggle={onRowToggle} rowExpansionTemplate={rowExpansionTemplate}
                                       dataKey="id">
                                <Column expander style={{ width: '3em' }} />
                                <Column field="reservationId" header="Reservation ID" />
                                <Column field="date" header="Date" />
                                <Column field="personCount" header="Person Count" />
                                <Column field="status" header="Status" />
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservationsPage;
