import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { InputMask } from "primereact/inputmask";
import { Button } from "primereact/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Client } from "@/types/clients";

interface ClientFormProps {
  visible: boolean;
  onHide: () => void;
  onSave: (data: Client) => void;
  client: Client;
}

const clientSchema = z.object({
  name: z.string().min(1, "O Nome é obrigatório"),
  email: z.string().email("E-mail inválido").min(1, "O E-mail é obrigatório"),
  phone: z.string().regex(/^\(\d{2}\)\s\d{5}-\d{4}$/, "Telefone inválido"),
});

export function ClientForm({ visible, onHide, onSave, client }: ClientFormProps) {
    const { control, handleSubmit, formState: { errors }, reset } = useForm<Client>({
        resolver: zodResolver(clientSchema),
        defaultValues: client,
    });

    useEffect(() => {
        reset(client);
    }, [client, reset]);

    return (
        <Dialog
            visible={visible}
            style={{ width: '32rem' }}
            breakpoints={{ '960px': '75vw', '641px': '90vw' }}
            header="Detalhes do Cliente"
            modal
            className="p-fluid"
            onHide={onHide}
        >
        <form onSubmit={handleSubmit(onSave)}>
            <div className="field mb-4">
                <label>Nome</label>
                <Controller name="name" control={control} render={({ field }) => <InputText {...field} />} />
                {errors.name && <small className="p-error">{errors.name.message}</small>}
            </div>

            <div className="field mb-4">
                <label>E-mail</label>
                <Controller name="email" control={control} render={({ field }) => <InputText {...field} />} />
                {errors.email && <small className="p-error">{errors.email.message}</small>}
            </div>

            <div className="field mb-4">
                <label>Telefone</label>
                <Controller name="phone" control={control} render={({ field }) => <InputMask {...field} mask="(99) 99999-9999" />} />
                {errors.phone && <small className="p-error">{errors.phone.message}</small>}
            </div>

            <div className="flex justify-end mt-3">
                <Button label="Cancelar" className="p-button-text" onClick={onHide} />
                <Button label="Salvar" className="p-button-primary" type="submit" />
            </div>
        </form>
        </Dialog>
    );
}
