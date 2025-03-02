'use client';

import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

import LayoutPage from "@/components/layout-page";
import PageTitle from "@/components/ui/page-title";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import TableHeader from "@/components/ui/table-header";
import { useOrders } from "@/hooks/useOrders";
import { Order } from "@/types/order";
import { OrderForm } from "@/components/pages/orders/OrderForm";
import { OrderDetail } from "@/components/pages/orders/OrderDetail";
import { formatCurrency } from "@/utils/formatCurrentUtils";
import { useClients } from "@/hooks/useClient";
import { useProducts } from "@/hooks/useProducts";
import { Tag } from "primereact/tag";
import { getStatusStyle, getStatusTranslation } from "@/utils/statusUtils";
import { formatDate } from "@/utils/formatDateUtils";



export default function Orders() {
    const { 
        orders, 
        orderDialog, 
        deleteOrderDialog, 
        updateOrder,
        setOrderDialog, 
        setDeleteOrderDialog, 
        newOrderDialog,
        setNewOrderDialog,
        order, 
        setOrder, 
        saveOrder, 
        deleteOrder, 
        toast 
    } = useOrders();

    const DEFAULT_ORDER: Order = {
        client: {
            id: "",
            name: ""
        },
        items: [],
        total: 0,
        status: "new",
        date: "",
        quantityTotal: 0
    }

    const { clients } = useClients();
    const { products } = useProducts();

    const [globalFilter, setGlobalFilter] = useState("");

    const openNew = () => {
        setOrder(DEFAULT_ORDER);
        setNewOrderDialog(true);
    };

    const onHide = (setDialog: (value: boolean) => void) => {
        setOrder(DEFAULT_ORDER);
        setDialog(false);
    };

    const confirmDeleteOrder = (order: Order) => {
        setOrder(order);
        setDeleteOrderDialog(true);
    };

    const actionBodyTemplate = (rowData: Order) => (
        <div className="flex gap-2 justify-end">
            <Button
                icon="pi pi-pencil"
                className="mr-2"
                tooltip="Detalhes do pedido"
                tooltipOptions={{ 
                    position: 'top',
                    mouseTrackTop: 15
                }}
                onClick={() => {
                    setOrder(rowData);
                    setOrderDialog(true);
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
                onClick={() => confirmDeleteOrder(rowData)}
            />
        </div>
    );

    const priceBodyTemplate = (order: Order) => {
        return formatCurrency(order?.total);
    };

    const dateBodyTemplate = (order: Order) => {
        return formatDate(new Date(order.date));
    };

    const statusBodyTemplate = (rowData: Order) => {
        return <Tag value={getStatusTranslation(rowData.status)} severity={getStatusStyle(rowData.status)} />;
    };

    return (
        <LayoutPage>
            <PageTitle>Gerenciar Pedidos</PageTitle>
            <Toast ref={toast} />
            <DataTable
                value={orders}
                paginator
                rows={5}
                header={<TableHeader openNew={openNew} setGlobalFilter={setGlobalFilter} />}
                globalFilter={globalFilter}
                emptyMessage="Nenhum pedido encontrado"
            >
                <Column field="id" header="ID" sortable />
                <Column field="client.name" header="Cliente" body={(rowData) => rowData.client?.name} sortable />
                <Column field="status" header="Status" body={statusBodyTemplate} sortable />
                <Column field="date" header="Data do pedido" body={dateBodyTemplate} sortable />
                <Column field="quantityTotal" header="Qtd de produtos" sortable />
                <Column field="total" header="Total" body={priceBodyTemplate} sortable />
                <Column body={actionBodyTemplate} />
            </DataTable>

            <OrderForm
                visible={newOrderDialog}
                onHide={() => onHide(setNewOrderDialog)}
                onSave={saveOrder}
                order={order}
                products={products}
                clients={clients}
            />

            <OrderDetail
                visible={orderDialog}
                onHide={() => onHide(setOrderDialog)}
                updateOrder={updateOrder}
                order={order}
            />

            <DeleteDialog
                header="Confirmar remoção"
                description={`Tem certeza de que deseja remover o pedido ${order?.id}?`}
                visible={deleteOrderDialog}
                onHide={() => onHide(setDeleteOrderDialog)}
                onDelete={deleteOrder}
            />
        </LayoutPage>
    );
}
