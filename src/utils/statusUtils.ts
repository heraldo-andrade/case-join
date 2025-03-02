export const getStatusStyle = (status: string) => {
    switch (status) {
        case 'new':
            return 'info';
        case 'pending':
            return 'warning';
        case 'completed':
            return 'success';
        case 'cancelled':
            return 'danger';
        default:
            return 'info';
    }
};

export const getStatusTranslation = (status: string) => {
    switch (status) {
        case 'new':
            return 'Novo';
        case 'pending':
            return 'Pendente';
        case 'completed':
            return 'Concluído';
        case 'cancelled':
            return 'Cancelado';
        default:
            return 'Desconhecido';
    }
};