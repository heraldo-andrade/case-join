'use client';

import React, { useState } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

import LayoutPage from "@/components/layout-page";
import { ClientForm } from "@/components/pages/clients/ClientForm";
import { useClients } from "@/hooks/useClient";
import { Client } from "@/types/clients";
import PageTitle from "@/components/ui/page-title";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import TableHeader from "@/components/ui/table-header";

export default function Clients() {
    const { 
        clients, 
        clientDialog, 
        deleteClientDialog, 
        setClientDialog, 
        setDeleteClientDialog, 
        client, 
        setClient, 
        saveClient, 
        deleteClient, 
        toast 
    } = useClients();

    const [globalFilter, setGlobalFilter] = useState("");

    const openNew = () => {
        setClient({ id: null, name: "", email: "", phone: "" });
        setClientDialog(true);
    };

    const onHide = (setDialog: (value: boolean) => void) => {
        setClient({ id: null, name: "", email: "", phone: "" });
        setDialog(false);
    };

    const confirmDeleteClient = (client: Client) => {
        setClient(client);
        setDeleteClientDialog(true);
    };

    const actionBodyTemplate = (rowData: Client) => (
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
                setClient(rowData);
                setClientDialog(true);
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
                onClick={() => confirmDeleteClient(rowData)}
            />
        </div>
    );

    return (
        <LayoutPage>
            <PageTitle>Gerenciar Clientes</PageTitle>
            <Toast ref={toast} />
            <DataTable
                value={clients}
                paginator
                rows={5}
                header={<TableHeader openNew={openNew} setGlobalFilter={setGlobalFilter} />}
                globalFilter={globalFilter}
                emptyMessage="Nenhum cliente encontrado"
            >
                <Column field="id" header="ID" sortable />
                <Column field="name" header="Nome" sortable />
                <Column field="email" header="E-mail" sortable />
                <Column field="phone" header="Telefone" sortable />
                <Column body={actionBodyTemplate} />
            </DataTable>

            <ClientForm
                visible={clientDialog}
                onHide={() => onHide(setClientDialog)}
                onSave={saveClient}
                client={client}
            />

            <DeleteDialog
                header="Confirmar remoção"
                description={`Tem certeza de que deseja remover ${client.name} da lista de clientes?`}
                visible={deleteClientDialog}
                onHide={() => onHide(setDeleteClientDialog)}
                onDelete={deleteClient}
            />
        </LayoutPage>
    );
}
