export const formatCurrency = (value: number | null) => {
    if (value === null || isNaN(value)) return "";
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2
    });
};