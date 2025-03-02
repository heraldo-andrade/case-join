'use client';

import React, { useState } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

import LayoutPage from "@/components/layout-page";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/product";
import PageTitle from "@/components/ui/page-title";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { ProductForm } from "@/components/pages/products/ProductForm";
import TableHeader from "@/components/ui/table-header";
import { formatCurrency } from "@/utils/formatCurrentUtils";
import { Badge } from "primereact/badge";

export default function Products() {
    const { 
        products, 
        productDialog, 
        deleteProductDialog, 
        setProductDialog, 
        setDeleteProductDialog, 
        product, 
        setProduct, 
        saveProduct, 
        deleteProduct, 
        toast 
    } = useProducts();

    const [globalFilter, setGlobalFilter] = useState("");

    const openNew = () => {
        setProduct({ id: undefined, name: "", price: 0, stock: 0 });
        setProductDialog(true);
    };

    const onHide = (setDialog: (value: boolean) => void) => {
        setProduct({ id: undefined, name: "", price: 0, stock: 0 });
        setDialog(false);
    };

    const confirmDeleteProduct = (product: Product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const actionBodyTemplate = (rowData: Product) => (
        <div className="flex gap-2 justify-end">
            <Button
            icon="pi pi-pencil"
            className="mr-2"
            tooltip="Editar"
            tooltipOptions={{ 
                position: 'top',
                mouseTrackTop: 15
            }}
            onClick={() => {
                const priceFormatted = String(rowData.price).replace(/[^\d,.-]/g, '').replace(',', '.');
                setProduct({
                    ...rowData,
                    price: parseFloat(priceFormatted),
                });
                setProductDialog(true);
            }}
            />
            <Button
                icon="pi pi-trash"
                className="p-button-danger"
                tooltip="Remover"
                tooltipOptions={{ 
                    position: 'top',
                    mouseTrackTop: 15
                }}
                onClick={() => confirmDeleteProduct(rowData)}
            />
        </div>
    );    
    
    const priceBodyTemplate = (product: Product) => {
        return formatCurrency(product?.price);
    };
    const stockBodyTemplate = (product: Product) => {
        return <Badge value={product.stock} severity={product.stock === 0 ? 'danger': 'info'}></Badge>;
    };

    return (
        <LayoutPage>
            <PageTitle>Gerenciar Produtos</PageTitle>
            <Toast ref={toast} />
            <DataTable
                value={products}
                paginator
                rows={5}
                header={<TableHeader openNew={openNew} setGlobalFilter={setGlobalFilter} />}
                globalFilter={globalFilter}
                emptyMessage="Nenhum produto encontrado"
            >
                <Column field="id" header="ID" sortable />
                <Column field="name" header="Nome" sortable />
                <Column field="price" header="Preço" body={priceBodyTemplate} sortable />
                <Column field="stock" header="Estoque" body={stockBodyTemplate} sortable />
                <Column body={actionBodyTemplate} />
            </DataTable>

            <ProductForm
                visible={productDialog}
                onHide={() => onHide(setProductDialog)}
                onSave={saveProduct}
                product={product}
            />

            <DeleteDialog
                header="Confirmar remoção"
                description={`Tem certeza de que deseja remover o produto ${product?.name}?`}
                visible={deleteProductDialog}
                onHide={() => onHide(setDeleteProductDialog)}
                onDelete={deleteProduct}
            />
        </LayoutPage>
    );
}
