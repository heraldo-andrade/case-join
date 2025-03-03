'use client'

import { Control, Controller, FieldErrors, UseFieldArrayRemove, UseFormSetValue } from "react-hook-form";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { formatCurrency } from "@/utils/formatCurrentUtils";
import { OrderSchema } from "./OrderForm";
import { Product } from "@/types/product";

export interface OrderProductsListProps {
  fields: { id: string }[]; 
  control: Control<OrderSchema>;
  products: Product[];
  setValue: UseFormSetValue<OrderSchema>;
  watchAllFields: OrderSchema;
  handleRemoveItem: UseFieldArrayRemove;
  handleAddItem: () => void;
  errors: FieldErrors<OrderSchema>;
}

export function OrderProductsList({
  fields,
  control,
  products,
  setValue,
  watchAllFields,
  handleRemoveItem,
  handleAddItem,
  errors
}: OrderProductsListProps) {

  return (
    <div className="field mb-4">
      <label className="font-bold">Adicionar produtos ao pedido:</label>
      {fields.map((item, index) => (
        <div key={item.id} className="border-b border-zinc-200 mb-4 pb-4 xs:border-b-0 xs:mb-2 xs:pb-0">
          <div className="flex gap-2">
            
            <div className="flex gap-2 flex-col xs:flex-row w-full">
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
            </div>
            
            <div className="flex">
              <Button type="button" icon="pi pi-trash" className="p-button-danger" onClick={() => handleRemoveItem(index)} />
            </div>
          </div>
          {errors.items?.[index]?.productId && <small className="p-error">{errors.items?.[index]?.productId?.message}</small>}
        </div>
      ))}
      <div className="flex justify-start w-full">
        <Button label="Adicionar Produto" disabled={!!errors?.items?.length} icon="pi pi-plus" onClick={handleAddItem} className="mt-2 w-fit" />

      </div>
      {errors.items && <small className="p-error">{errors.items.message}</small>}
      {errors?.items?.root && <small className="p-error">{errors?.items?.root.message}</small>}
    </div>
  );
}