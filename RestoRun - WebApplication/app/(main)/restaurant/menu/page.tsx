/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import MealsAPI from "../../../api/restaurant-api/MealsAPI";

interface Meal {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    rating: number;
}

/* @todo Used 'as any' for types here. Will fix in next version due to onSelectionChange event type issue. */
const MenuPage = () => {
    const emptyMeal: Meal = {
        id: '',
        name: '',
        description: '',
        price: 0,
        category: '',
        rating: 0,
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    const [meals, setMeals] = useState<Meal[]>([]);
    const [selectedMeals, setSelectedMeals] = useState(null);
    const [meal, setMeal] = useState<Meal>(emptyMeal);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [isEditMode, setIsEditMode] = useState(false);

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

    const actionBodyTemplate = (rowData: Meal) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => handleEdit(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => handleDelete(rowData.id)} />
            </>
        );
    };

    const handleEdit = (rowData: Meal) => {
        setIsEditMode(true);
        setName(rowData.name);
        setDescription(rowData.description);
        setPrice(rowData.price);
        setIsModalVisible(true);
    }

    const handleDelete = (id: string) => {
        const api = new MealsAPI('http://localhost:8080');
        try {
            api.deleteMeal(id);
            fetchMeals();
        }
        catch (err) {
            setError('Error deleting meal');
            console.error(err);
        }
    }


    const [mealDialog, setMealDialog] = useState(false);
    const [deleteMealDialog, setDeleteMealDialog] = useState(false);
    const [deleteMealsDialog, setDeleteMealsDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    const openNew = () => {
        setMeal(emptyMeal);
        setSubmitted(false);
        setMealDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setMealDialog(false);
    };

    const hideDeleteMealDialog = () => {
        setDeleteMealDialog(false);
    };

    const hideDeleteMealsDialog = () => {
        setDeleteMealsDialog(false);
    };

    const saveMeal = () => {
        setSubmitted(true);

        if (meal.name.trim()) {
            let _meals = [...(meals as any)];
            let _meal = { ...meal};
            if (meal.id) {
                const index = findIndexById(meal.id);

                _meals[index] = _meal;
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Meal Updated',
                    life: 3000
                });
            } else {
                _meal.id = createId();
                //_meal.image = 'meal-placeholder.svg';
                _meals.push(_meal);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Meal Created',
                    life: 3000
                });
            }

            setMeals(_meal as any);
            setMealDialog(false);
            setMeal(emptyMeal);
        }
    };

    const editMeal = (meal: Meal) => {
        setMeal({ ...meal });
        setMealDialog(true);
    };

    const confirmDeleteMeal = (meal: Meal) => {
        setMeal(meal);
        setDeleteMealDialog(true);
    };

    const deleteMeal = () => {
        let _meals = (meals as any)?.filter((val: any) => val.id !== meal.id);
        setMeals(_meals);
        setDeleteMealDialog(false);
        setMeal(emptyMeal);
        toast.current?.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Meal Deleted',
            life: 3000
        });
    };

    const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < (meals as any)?.length; i++) {
            if ((meals as any)[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteMealsDialog(true);
    };

    const deleteSelectedMeals = () => {
        let _meals = (meals as any)?.filter((val: any) => !(selectedMeals as any)?.includes(val));
        setMeals(_meals);
        setDeleteMealsDialog(false);
        setSelectedMeals(null);
        toast.current?.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Meals Deleted',
            life: 3000
        });
    };

    const onCategoryChange = (e: RadioButtonChangeEvent) => {
        let _meal = { ...meal };
        _meal['category'] = e.value;
        setMeal(_meal);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _meal = { ...meal };
        _meal[`${name}`] = val;

        setMeal(_meal);
    };

    const onInputNumberChange = (e: InputNumberValueChangeEvent, name: string) => {
        const val = e.value || 0;
        let _meal = { ...meal };
        _meal[`${name}`] = val;

        setMeal(_meal);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedMeals || !(selectedMeals as any).length} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
            </React.Fragment>
        );
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

    /*const imageBodyTemplate = (rowData: Meal) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <img src={`/demo/images/meal/${rowData.image}`} alt={rowData.image} className="shadow-2" width="100" />
            </>
        );
    };*/

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

    /*const statusBodyTemplate = (rowData: Meal) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                <span className={`meal-badge status-${rowData.inventoryStatus?.toLowerCase()}`}>{rowData.inventoryStatus}</span>
            </>
        );
    };*/

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Meals</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const mealDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveMeal} />
        </>
    );
    const deleteMealDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteMealDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteMeal} />
        </>
    );
    const deleteMealsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteMealsDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedMeals} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

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
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={mealDialog} style={{ width: '450px' }} header="Meal Details" modal className="p-fluid" footer={mealDialogFooter} onHide={hideDialog}>

                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <InputText
                                id="name"
                                value={meal.name}
                                onChange={(e) => onInputChange(e, 'name')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !meal.name
                                })}
                            />
                            {submitted && !meal.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <InputTextarea id="description" value={meal.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                        </div>

                        <div className="field">
                            <label className="mb-3">Category</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category1" name="category" value="Meat" onChange={onCategoryChange} checked={meal.category === 'Meat'} />
                                    <label htmlFor="category1">Meat</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category2" name="category" value="Dessert" onChange={onCategoryChange} checked={meal.category === 'Dessert'} />
                                    <label htmlFor="category2">Dessert</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category3" name="category" value="Beverage" onChange={onCategoryChange} checked={meal.category === 'Beverage'} />
                                    <label htmlFor="category3">Beverage</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category4" name="category" value="Starter" onChange={onCategoryChange} checked={meal.category === 'Starter'} />
                                    <label htmlFor="category4">Starter</label>
                                </div>
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="price">Price</label>
                                <InputNumber id="price" value={meal.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                            </div>
                            <div className="field col">
                                <label htmlFor="quantity">Quantity</label>

                            </div>
                        </div>
                    </Dialog>

                    <Dialog visible={deleteMealDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteMealDialogFooter} onHide={hideDeleteMealDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {meal && (
                                <span>
                                    Are you sure you want to delete <b>{meal.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteMealsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteMealsDialogFooter} onHide={hideDeleteMealsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {meal && <span>Are you sure you want to delete the selected meals?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

// <Column header="Image" body={imageBodyTemplate}></Column>
// <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable headerStyle={{ minWidth: '10rem' }}></Column>
// {meal.image && <img src={`/demo/images/meal/${meal.image}`} alt={meal.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
// <InputNumber id="quantity" value={meal.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} />
export default MenuPage;
