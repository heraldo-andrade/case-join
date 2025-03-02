'use client'

import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Product } from "@/types/product";
import { InputNumber } from "primereact/inputnumber";
import { formatCurrency } from "@/utils/formatCurrentUtils";

interface ProductFormProps {
  visible: boolean;
  onHide: () => void;
  onSave: (data: Product) => void;
  product: Product;
}

const productSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "O Nome é obrigatório"),
    price: z.coerce.number().min(0.01, "O Preço deve ser maior que zero").refine(value => !isNaN(value), {
        message: "O Preço não pode ser vazio",
    }),
    stock: z.coerce.number().min(0, "O Estoque deve ser um número positivo")
});

export function ProductForm({ visible, onHide, onSave, product }: ProductFormProps) {
    const { control, handleSubmit, formState: { errors }, reset } = useForm<Product>({
        resolver: zodResolver(productSchema),
        defaultValues: product,
    });

    useEffect(() => {
        reset(product);
    }, [product, reset]);

    return (
        <Dialog
            visible={visible}
            style={{ width: '32rem' }}
            breakpoints={{ '960px': '75vw', '641px': '90vw' }}
            header="Detalhes do Produto"
            modal
            className="p-fluid"
            onHide={onHide}
        >
        <form onSubmit={handleSubmit(onSave)}>
            <Controller name="id" control={control} render={({ field }) => <InputText type="hidden" {...field} />} />
            <div className="field mb-4">
                <label>Nome</label>
                <Controller name="name" control={control} render={({ field }) => <InputText {...field} />} />
                {errors.name && <small className="p-error">{errors.name.message}</small>}
            </div>

            <div className="field mb-4">
                <label>Preço</label>
                <Controller
                    name="price"
                    control={control}
                    rules={{ required: "O preço é obrigatório" }}
                    render={({ field: { onChange, value } }) => (
                        <InputText
                            id="price"
                            value={formatCurrency(value)}
                            onChange={(e) => {
                                const rawValue = e.target.value.replace(/\D/g, "");
                                const numericValue = parseFloat(rawValue) / 100;
                                onChange(numericValue);
                            }}
                            placeholder="Digite o valor"
                        />
                    )}
                />
                {errors.price && <small className="p-error">{errors.price.message}</small>}
            </div>

            <div className="field mb-4">
                <label>Quantidade em estoque</label>
                <Controller
                    name="stock"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <InputNumber
                            value={Number(value)}
                            onValueChange={(e) => onChange(Number(e.value))}
                            useGrouping={false}
                            showButtons
                            min={0}
                        />
                    )}
                />
                {errors.stock && <small className="p-error">{errors.stock.message}</small>}
            </div>

            <div className="flex justify-end mt-3 gap-4">
                <Button
                    className="border-purple-primary text-purple-primary"
                    label="Cancelar"
                    outlined
                    type="button"
                    onClick={onHide}
                />
                <Button label="Salvar" severity="success" type="submit" />
            </div>
        </form>
        </Dialog>
    );
}
