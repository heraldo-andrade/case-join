'use client'

import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';  
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function TopBar() {
    const router = useRouter();

    const items = [
        {
            label: 'Clientes',
            icon: 'pi pi-users',
            command: () => {
                router.push('/clients');
            },
        },
        {
            label: 'Produtos',
            icon: 'pi pi-box',
            command: () => {
                router.push('/products');
            }
        },
        {
            label: 'Pedidos',
            icon: 'pi pi-envelope',
            command: () => {
                router.push('/orders');
            }
        }
    ];

    const start = <Image width={100} height={25} alt="logo" src="/next.svg" className="mr-10 ml-2" />;
    const end = (
        <div className="flex align-items-center gap-4 mr-2">
            <Avatar icon="pi pi-user" size="normal" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} shape="circle" />
        </div>
    );

    return (
        <Menubar
            className="teste"
   
            model={items}
            start={start}
            end={end}
        />
    )
}