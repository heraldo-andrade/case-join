'use client'

import { Controller, Control, UseFormSetValue, FieldErrors } from "react-hook-form";
import { InputText } from "primereact/inputtext";

import { Client } from "@/types/clients";
import { OrderSchema } from "./OrderForm";

interface OrderClientProps {
  control: Control<OrderSchema>;
  clients: Client[];
  setValue: UseFormSetValue<OrderSchema>;
  errors: FieldErrors<OrderSchema>;
}

export function OrderClient({ control, clients, setValue, errors }: OrderClientProps) {

  return (
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
  );
}