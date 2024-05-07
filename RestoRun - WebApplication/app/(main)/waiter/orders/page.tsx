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
import { Chip } from 'primereact/chip';
import { TabView, TabPanel } from 'primereact/tabview';
import { Rating } from 'primereact/rating';
import MealsAPI from '../../../api/restaurant-api/MealsAPI';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { InputText } from 'primereact/inputtext';



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


    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');

    // @TODO THIS WILL BE REMOVED
    const [rating, setRating] = useState(0);

    const [meals, setMeals] = useState<Meal[]>([]);
    const [selectedMeals, setSelectedMeals] = useState(null);
    const [meal, setMeal] = useState<Meal>(emptyMeal);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [isEditMode, setIsEditMode] = useState(false);

    const [mealDialog, setMealDialog] = useState(false);
    const [deleteMealDialog, setDeleteMealDialog] = useState(false);
    const [deleteMealsDialog, setDeleteMealsDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);

    const fetchMeals = async () => {
        // fetch meals from the server
        const api = new MealsAPI('http://localhost:8080');
        try {
            const data = await api.retrieveAllMeals();
            setMeals(data);
        }
        catch (err) {
            setError('Error fetching meals');
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMeals();
    }, []);


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

    
    
    const rowExpansionTemplate = (data) => (
        <Card title={`Order Details for ID: ${data.id}`} style={{ marginBottom: '20px', backgroundColor: '#f4f4f4' }} className="order-details-card">
            <div className="p-grid">
                <div className="p-col-12 p-md-6 order-details-item">
                    <label><strong>Total Price:</strong></label>
                    <Chip label={`$${data.totalPrice.toFixed(2)}`} className="total-price-chip" />
                </div>
                <div className="p-col-12 p-md-6 order-details-item">
                    <label><strong>Status:</strong></label>
                    <Tag className={`status-tag p-tag-${getStatusColor(data.status)}`} value={data.status}></Tag>
                </div>
                <div className="p-col-12 p-md-6 order-details-item">
                    <label><strong>Customer ID:</strong></label>
                    <p>{data.customerId}</p>
                </div>
                <div className="p-col-12 order-details-item">
                    <h6>Meals Included:</h6>
                    {data.meals && data.meals.map((meal) => (
                        <Card key={meal.id} title={meal.name} subTitle={`$${meal.price.toFixed(2)}`} style={{ marginBottom: '10px', backgroundColor: '#ffffff' }} className="meal-card">
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

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Meals</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );
    
    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };
    

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

    

    const codeBodyTemplate = (rowData: Meal) => {
        return (
            <>
                <span className="p-column-title">Code</span>
                {rowData.id}
            </>
        );
    };

    const nameBodyTemplate = (rowData: Meal) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    };

    const priceBodyTemplate = (rowData: Meal) => {
        return (
            <>
                <span className="p-column-title">Price</span>
                {formatCurrency(rowData.price as number)}
            </>
        );
    };

    const categoryBodyTemplate = (rowData: Meal) => {
        return (
            <>
                <span className="p-column-title">Category</span>
                {rowData.category}
            </>
        );
    };

    const ratingBodyTemplate = (rowData: Meal) => {
        return (
            <>
                <span className="p-column-title">Reviews</span>
                <Rating value={rowData.rating} readOnly cancel={false} />
            </>
        );
    };
    

    return (
        <div className="grid">
            <div className="col-12">
                <TabView>
                    <TabPanel header="Orders">
                        <div className="card">
                            <h5>Orders List for Chef</h5>
                            <div className="grid">
                                <div className="col-12">
                                    <DataTable value={orders} expandedRows={expandedRows} onRowToggle={onRowToggle}
                                               rowExpansionTemplate={rowExpansionTemplate} dataKey="id">
                                        <Column expander style={{ width: '3em' }} />
                                        <Column field="id" header="Order ID" />
                                        <Column field="totalPrice" header="Total Price" />
                                        <Column field="status" header="Status" body={statusBodyTemplate} />
                                    </DataTable>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel header="Make an Order">
                        <div className="card">
                            <h5>Make an Order</h5>
                            <DataTable
                                ref={dt}
                                value={meals}
                                selection={selectedMeals}
                                onSelectionChange={(e) => setSelectedMeals(e.value as any)}
                                dataKey="id"
                                paginator
                                rows={10}
                                rowsPerPageOptions={[5, 10, 25]}
                                className="datatable-responsive"
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} meals"
                                globalFilter={globalFilter}
                                emptyMessage="No meals found."
                                header={header}
                                responsiveLayout="scroll"
                            >
                                <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                                <Column field="id" header="Id" sortable body={codeBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                                <Column field="name" header="Name" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>

                                <Column field="price" header="Price" body={priceBodyTemplate} sortable></Column>
                                <Column field="category" header="Category" sortable body={categoryBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                                <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable></Column>

                                <Column field="description" header="Description" headerStyle={{ minWidth: '10rem' }}></Column>
                            </DataTable>
                        </div>
                    </TabPanel>
                </TabView>
                
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
*/