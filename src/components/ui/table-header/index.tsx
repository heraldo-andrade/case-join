'use client'

import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import React from 'react';

interface TableHeaderProps {
    openNew: () => void
    setGlobalFilter: (e: string) => void
}

export default function TableHeader({ openNew, setGlobalFilter }: TableHeaderProps) {

    return (
        <div className="flex flex-col justify-between xs:flex-row gap-4">
            <Button label="Novo" icon="pi pi-plus" onClick={openNew} className="p-button-success" />
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText
                    className="w-full"
                    type="search"
                    placeholder="Buscar..."
                    onInput={(e) => setGlobalFilter(e.currentTarget.value)}
                />
            </IconField>
        </div>
    )
}