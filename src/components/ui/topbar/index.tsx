'use client'

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import Nav from '../nav';
import Logo from '../logo';

export default function TopBar() {
    const [visible, setVisible] = useState<boolean>(false);
    const pathname = usePathname();

    const items = [
        {
            label: 'Clientes',
            icon: 'pi pi-users',
            path: '/clients',
        },
        {
            label: 'Produtos',
            icon: 'pi pi-box',
            path: '/products',
        },
        {
            label: 'Pedidos',
            icon: 'pi pi-shopping-cart',
            path: '/orders',
        }
    ];

    return (
        <>
            <div className="flex px-4 md:px-10 gap-10 py-3 items-center bg-purple-primary fixed w-full left-0 top-0 z-10">
                <div className="flex flex-1 items-center gap-10">
                    <Logo />
                    <Nav items={items} pathname={pathname} classNames="gap-8 hidden xs:flex" />
                </div>

                <Button icon="pi pi-bars" onClick={() => setVisible(true)}  className="bg-purple-primary border-white flex xs:hidden"/>
            </div>

            <Sidebar closeIcon={() => <i className="pi pi-times text-white text-2xl"></i>} header={() => <Logo />} visible={visible} onHide={() => setVisible(false)} className="bg-purple-primary">    
                <Nav items={items} pathname={pathname} classNames="gap-4 flex flex-col mt-10" setVisible={setVisible} />
            </Sidebar>
        </>
    )
}