'use client'

import { useForm, useFieldArray } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useCallback } from "react";
import { Order } from "@/types/order";

import { Client } from "@/types/clients";
import { Product } from "@/types/product";
import { OrderProductsList } from "./OrderProductsList";
import { OrderTotal } from "./OrderTotal";
import { OrderClient } from "./OrderClient";

interface OrderFormProps {
  visible: boolean;
  onHide: () => void;
  onSave: (data: OrderSchema) => void;
  order: Order;
  products: Product[];
  clients: Client[];
}

export interface ProductSchema {
  productId: string;
  productName?: string;
  quantity: number;
  price?: number;
}

export interface OrderSchema {
  client: {
    id: string;
    name: string;
  };
  items: Array<ProductSchema>;
}

const orderSchema = z.object({
  client: z.object({
    id: z.string().min(1, "Selecione um cliente"),
    name: z.string().min(1, "Selecione um cliente"),
  }),
  items: z.array(
    z.object({
      productId: z.string().min(1, "Selecione um produto"),
      productName: z.string().optional(),
      quantity: z.number().min(1, "A quantidade deve ser maior que zero"),
      price: z.number().optional()
    })
  ).min(1, "Adicione ao menos um item ao pedido"),
  total: z.number().optional(),
  status: z.string().optional(),
});

export function OrderForm({ visible, onHide, onSave, order, products, clients }: OrderFormProps) {
  const { control, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm<OrderSchema>({
    resolver: zodResolver(orderSchema),
    defaultValues: order,
    mode: "onChange",
  });  

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  useEffect(() => {
    reset();
  }, [onHide])

  const [totalProducts, setTotalProducts] = useState("0.00");

  const calculateTotal = useCallback(
    (items: { productId: string; quantity: number }[]) => {
      const total = items.reduce(
        (acc, { productId, quantity }) =>
          acc + (products?.find(({ id }) => id === productId)?.price || 0) * quantity,
        0
      );
      setTotalProducts(total.toFixed(2));
    },
    [products]
  );

  useEffect(() => {
    reset(order, { keepDefaultValues: true, keepErrors: true });
    calculateTotal(order.items || []);
  }, [order, reset, calculateTotal]);

  const watchAllFields = watch();

  useEffect(() => {
    calculateTotal(watchAllFields.items);
  }, [watchAllFields, calculateTotal]);

  const handleAddItem = () => {
    append({ productId: "", quantity: 1, price: 0 });
  };

  const calculateQuantity = () => {
    const total = watchAllFields.items.reduce((acc, { quantity }) => acc + quantity, 0);
    return total;
  };

  
  const onSubmit = (data: OrderSchema) => {
    const date = new Date();
    date.setHours(date.getHours() - date.getTimezoneOffset() / 60);

    const newData = {
      ...data,
      total: parseFloat(totalProducts),
      quantityTotal: calculateQuantity(),
      status: "new",
      date: date.toISOString(),
    };
    onSave(newData);
  };

  return (
    <Dialog
      visible={visible}
      style={{ width: '50rem' }}
      breakpoints={{ '960px': '75vw', '641px': '90vw' }}
      header="Gerar novo pedido"
      modal
      className="p-fluid"
      onHide={onHide}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <OrderClient
          control={control}
          clients={clients}
          setValue={setValue}
          errors={errors}
        />

        <OrderProductsList
          fields={fields}
          control={control}
          errors={errors}
          handleRemoveItem={remove}
          products={products}
          setValue={setValue}
          watchAllFields={watchAllFields}
          handleAddItem={handleAddItem}
        />

        <OrderTotal totalProducts={totalProducts} />

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