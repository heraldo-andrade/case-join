'use client'

import { Controller, useForm, useFieldArray } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useCallback } from "react";
import { Order } from "@/types/order";
import { InputNumber } from "primereact/inputnumber";

import { Client } from "@/types/clients";
import { formatCurrency } from "@/utils/formatCurrentUtils";
import { Product } from "@/types/product";

interface OrderFormProps {
  visible: boolean;
  onHide: () => void;
  onSave: (data: OrderSchema) => void;
  order: Order;
  products: Product[];
  clients: Client[];
}

export interface OrderSchema {
  client: {
    id: string;
    name: string;
  };
  items: Array<{
      productId: string;
      productName?: string;
      quantity: number;
      price?: number;
  }>;
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

  const handleRemoveItem = (index: number) => {
    remove(index);
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
        <div className="field mb-4">
          <label className="font-bold">Vincular cliente ao pedido:</label>
          <Controller
            name="client.id"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="p-inputtext p-component"
                onChange={(e) => {
                  const selectedClientId = e.currentTarget.value;
                  field.onChange(selectedClientId);
          
                  const selectedClient = clients.find(
                    (client) => client.id === selectedClientId
                  );
          
                  if (selectedClient) {
                    setValue('client.name', selectedClient.name);
                  }
                }}
              >
                <option value="">Selecione um cliente</option>
                {clients.map((client) => (
                  <option key={client.id} value={`${client.id}`}>
                      {client.name}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.client?.id && <small className="p-error">{errors.client?.id.message}</small>}
          <Controller
            name="client.name"
            control={control}
            render={({ field }) => (
              <InputText
              type="hidden"
                {...field}
                value={field.value}
              />
            )}
          />
        </div>

        <div className="field mb-4">
          <label className="font-bold">Adicionar produtos ao pedido:</label>
          {fields.map((item, index) => (
            <div key={item.id} className="mb-2">
              <div className="flex gap-2">
                <div className="flex w-full flex-3">
                  <Controller
                    name={`items.${index}.productId`}
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="p-inputtext p-component"
                        onChange={(e) => {
                          const selectedProductId = e.currentTarget.value;
                          field.onChange(selectedProductId);
                  
                          const selectedProduct = products.find(
                            (product) => product.id === selectedProductId
                          );

                          const quantity = watchAllFields.items[index]?.quantity
                  
                          if (selectedProduct) {
                            setValue(`items.${index}.productName`, selectedProduct.name);
                            setValue(`items.${index}.price`, selectedProduct.price);
                            setValue(`items.${index}.quantity`, quantity > selectedProduct.stock ? selectedProduct.stock : quantity);
                          }
                        }}
                      >
                        <option value="">Selecione um produto</option>
                        {products.map((product) => {

                          const findSelectedProducts = watchAllFields.items.find(
                            (item) => item.productId === product.id
                          );

                          return(
                          <option
                            key={product.id}
                            disabled={product.stock === 0 || !!findSelectedProducts }
                            value={`${product.id}`}
                            className="disabled:text-zinc-200"
                          >
                            {product.stock === 0 ? '[ESGOTADO]' : `[${product.stock}] `}{product.name} - {formatCurrency(Number(product.price))}
                          </option>
                        )})}
                      </select>
                    )}
                  />

                </div>
                <div className="flex-1">
                  <Controller
                    name={`items.${index}.quantity`}
                    control={control}
                    render={({ field }) => {
                      const selectedProduct = products.find(product => product.id === watchAllFields.items[index]?.productId);
                      const maxStock = selectedProduct?.stock ?? 1;

                      return (
                        <InputNumber
                          value={field.value}
                          onValueChange={(e) => {
                            const newValue = Math.min(e.value || 1, maxStock);
                            field.onChange(newValue);
                          }}
                          min={1}
                          max={maxStock}
                          showButtons
                        />
                      );
                    }}
                  />
                </div>

                <div className="flex">
                  <Button icon="pi pi-trash" className="p-button-danger" onClick={() => handleRemoveItem(index)} />
                </div>
              </div>
              {errors.items?.[index]?.productId && <small className="p-error">{errors.items?.[index]?.productId?.message}</small>}
            </div>
          ))}
          <Button label="Adicionar Produto" disabled={!!errors?.items?.length} icon="pi pi-plus" onClick={handleAddItem} className="p-button-secondary" />
          {errors.items && <small className="p-error">{errors.items.message}</small>}
          {errors?.items?.root && <small className="p-error">{errors?.items?.root.message}</small>}
        </div>

        <div className="field mb-4">
          <div className="flex justify-start text-primary mb-6 py-6 font-bold border-t border-b border-zinc-200">
            <div>Total:</div>
              <div className="ml-5">{formatCurrency(Number(totalProducts))}</div>
          </div>
        </div>

        <div className="flex justify-end mt-3 gap-4">
          <Button label="Cancelar" outlined type="button" onClick={onHide} />
          <Button label="Salvar" type="submit" />
        </div>
      </form>
    </Dialog>
  );
}