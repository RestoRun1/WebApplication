'use client';

import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


const ReservationsPage = () => {
    const [dateFrom, setDateFrom] = useState<Date | null>(null);
    const [dateTo, setDateTo] = useState<Date | null>(null);

    const [expandedRows, setExpandedRows] = useState(null);

    // Dummy data for the table
    const reservations = [
        {"reservationId":"XNN-78681694","date":"2023-06-30 22:24:29","personCount":7,"status":"Pending"},
        {"reservationId":"OJB-74832586","date":"2023-06-03 17:10:38","personCount":7,"status":"Completed"},
        {"reservationId":"XVQ-14533640","date":"2023-05-11 09:46:01","personCount":9,"status":"Completed"},
        {"reservationId":"FYN-41498349","date":"2023-11-03 03:08:49","personCount":4,"status":"Pending"},
        {"reservationId":"QYH-61052679","date":"2023-04-05 21:24:46","personCount":1,"status":"Completed"},
        {"reservationId":"BRF-50470255","date":"2022-12-17 10:49:20","personCount":10,"status":"Cancelled"},
        {"reservationId":"VPQ-61902326","date":"2023-11-10 03:20:42","personCount":10,"status":"Confirmed"},
        {"reservationId":"BPJ-44731951","date":"2022-12-28 02:22:11","personCount":4,"status":"Pending"},
        {"reservationId":"EKR-45834663","date":"2023-03-05 00:56:19","personCount":1,"status":"Cancelled"},
        {"reservationId":"BYV-52492416","date":"2023-07-19 13:51:07","personCount":8,"status":"Confirmed"}
    ];

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
