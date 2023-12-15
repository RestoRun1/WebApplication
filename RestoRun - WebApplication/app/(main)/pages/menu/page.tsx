'use client';
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { Demo } from '../../../../types/types';
import { ProductService } from '../../../../demo/service/ProductService';

const MenuPage = () => {
    const [products, setProducts] = useState<Demo.Product[]>([]);
    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data));
    }, []);
    const formatCurrency = (value: number) => {
        return value?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Menu</h5>
                    <p>Add/Remove/Modify Dishes</p>
                    <DataTable value={products} rows={10} paginator responsiveLayout="scroll">
                        <Column header="Image" body={(data) => <img className="shadow-2" src={`/demo/images/product/${data.image}`} alt={data.image} width="50" />} />
                        <Column field="name" header="Name" sortable style={{ width: '35%' }} />
                        <Column field="price" header="Price" sortable style={{ width: '35%' }} body={(data) => formatCurrency(data.price)} />
                        <Column
                            header="View"
                            style={{ width: '15%' }}
                            body={() => (
                                <>
                                    <Button icon="pi pi-search" text />
                                </>
                            )}
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default MenuPage;
