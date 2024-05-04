'use client';

import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface Reservation {
    id: string;
    reservationId: string;
    date: string;
    personCount: number;
    status: string;
    customerName: string;
    customerAddress: string;
}

const ReservationsPage = () => {


    const [dateFrom, setDateFrom] = useState<Date | null>(null);
    const [dateTo, setDateTo] = useState<Date | null>(null);

    const [expandedRows, setExpandedRows] = useState(null);


    const rowExpansionTemplate = (data) => {
        return (
            <div className="reservation-details">
                {/* You can structure your detailed view here */}
                <h5>Reservation Details</h5>
                <p>Name: {data.customerName}</p>
                <p>Address: {data.customerAddress}</p>
                {/* ... other details */}
            </div>
        );
    };

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
