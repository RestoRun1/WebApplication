'use client';

import React, { useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import { Button } from "primereact/button";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ChefOrdersAPI from '../../../api/chef-api/OrdersAPI';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';

interface Order {
    id: number;
    totalPrice: number;
    quantity: number;
    status: OrderStatus;
    tableId: number;
    customerId: number;   
    meals: Meal[];
}

enum OrderStatus {
    // OrderStatus will have the following properties
    PENDING = 'PENDING',
    PREPARING = 'PREPARING',
    READY = 'READY',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
}

interface Meal {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    rating: number;
}

const OrdersPage = () => {
    const emptyMeal: Meal = {
        id: '',
        name: '',
        description: '',
        price: 0,
        category: '',
        rating: 0,
    };
    
    const [dateFrom, setDateFrom] = useState<Date | null>(null);
    const [dateTo, setDateTo] = useState<Date | null>(null);
    const [expandedRows, setExpandedRows] = useState({});
    const [orders, setOrders] = useState<Order[]>([]);
    const [dialogVisible, setDialogVisible] = useState(false);


    const fetchOrders = async () => {
        const api = new ChefOrdersAPI('http://localhost:8080');
        try {
            const data = await api.retrieveAllOrders();
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const onRowToggle = (event) => {
        setExpandedRows(event.data);
    };

    const showDialog = () => {
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
    };

    const dialogFooter = (
        <div>
            <Button label="Close" icon="pi pi-times" onClick={hideDialog} className="p-button-text" />
        </div>
    );
    
    const rowExpansionTemplate = (data) => (
        <Card title={`Order Details for ID: ${data.id}`} style={{ marginBottom: '20px' }}>
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-6">
                    <label><strong>Total Price:</strong></label>
                    <p>${data.totalPrice.toFixed(2)}</p>
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label><strong>Status:</strong></label>
                    <Tag className={`p-tag-${getStatusColor(data.status)}`} value={data.status}></Tag>
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label><strong>Customer ID:</strong></label>
                    <p>{data.customerId}</p>
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <h6>Meals Included:</h6>
                    {data.meals && data.meals.map((meal) => (
                        <Card key={meal.id} title={meal.name} subTitle={`$${meal.price.toFixed(2)}`} style={{ marginBottom: '10px' }}>
                            <p>{meal.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </Card>
    );
    
    
    function getStatusColor(status) {
        switch (status) {
            case 'PENDING': return 'warning';
            case 'PREPARING': return 'info';
            case 'READY': return 'success';
            case 'DELIVERED': return 'success';
            case 'CANCELLED': return 'danger';
            default: return 'secondary';
        }
    }
    

    const statusBodyTemplate = (rowData) => {
        let statusClass = '';
        switch (rowData.status) {
            case 'PENDING':
                statusClass = 'p-tag p-tag-warning';
                break;
            case 'PREPARING':
                statusClass = 'p-tag p-tag-info';
                break;
            case 'READY':
                statusClass = 'p-tag p-tag-success';
                break;
            case 'DELIVERED':
                statusClass = 'p-tag p-tag-success';
                break;
            case 'CANCELLED':
                statusClass = 'p-tag p-tag-danger';
                break;
            default:
                statusClass = 'p-tag p-tag-secondary';
        }
    
        return <span className={statusClass}>{rowData.status}</span>;
    };
    

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Orders List for Waiter</h5>
                    <Button label="Add Order" icon="pi pi-external-link" onClick={showDialog} className="p-button-success" style={{ marginBottom: '10px' }} />
                    <div className="grid">
                        <div className="col-12">
                            <DataTable value={orders} expandedRows={expandedRows} onRowToggle={onRowToggle}
                                       rowExpansionTemplate={rowExpansionTemplate} dataKey="id">
                                <Column expander style={{ width: '3em' }} />
                                <Column field="id" header="Order ID" />
                                <Column field="date" header="Date" />
                                <Column field="personCount" header="Person Count" />
                                <Column field="status" header="Status" body={statusBodyTemplate} />
                            </DataTable>
                        </div>
                    </div>
                </div>
                <Dialog header="Order Details" visible={dialogVisible} style={{ width: '50vw' }} footer={dialogFooter} onHide={hideDialog}>
                    {/* You can place form or other content here to display or fetch order details */}
                    <p>This is a place for the order form or details.</p>
                </Dialog>
            </div>
        </div>
    );
};

export default OrdersPage;

/*
<div className='col-3'>
                            <Calendar value={dateFrom} onChange={(e) => setDateFrom(e.value)} showIcon />
                            <Calendar value={dateTo} onChange={(e) => setDateTo(e.value)} showIcon />
                            <Button label="Search" className="p-button-success" style={{ width: '100%' }} />
                        </div>
*/