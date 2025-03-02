'use client'

import Link from 'next/link';
import React from 'react';

interface NavItem {
    label: string;
    icon: string;
    path: string;
}

interface NavProps {
    classNames: string;
    items: NavItem[];
    pathname: string;
}

export default function Nav({ classNames, items, pathname }: NavProps) {

    return (
        <nav>
            <ul className={classNames}>
                {items.map((item: NavItem, index: number) => (
                    <li key={index}>
                        <Link
                            href={item.path}
                            className={`transition-colors ${pathname === item.path ? 'text-green-primary' : 'text-white'} hover:text-green-primary`}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}