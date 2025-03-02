'use client'

import React from 'react';

interface Props {
    children: React.ReactNode
}

export default function PageTitle({ children }: Props) {

    return (
        <h1 className="text-2xl mb-8 font-semibold text-purple-primary">{children}</h1>
    )
}