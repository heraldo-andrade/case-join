import { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { ClientService } from "@/services/clientService";

interface Client {
  id?: string | null;
  name: string;
  email: string;
  phone: string;
}

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [clientDialog, setClientDialog] = useState(false);
  const [deleteClientDialog, setDeleteClientDialog] = useState(false);
  const [client, setClient] = useState<Client>({ id: null, name: "", email: "", phone: "" });
  const toast = useRef<Toast>(null);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = () => {
    ClientService.getClients().then(setClients);
  };

  const saveClient = async (data: Client) => {
    try {
      if (client?.id) {
        await ClientService.updateClient(client.id, data);
      } else {
        await ClientService.createClient(data);
      }
      loadClients();
      setClientDialog(false);
      toast.current?.show({ severity: "success", summary: "Sucesso", detail: "Cliente salvo", life: 3000 });
    } catch {
      toast.current?.show({ severity: "error", summary: "Erro", detail: "Erro ao salvar cliente", life: 3000 });
    }
  };

  const deleteClient = async () => {
    if (client?.id) {
      try {
        await ClientService.deleteClient(client.id);
        loadClients();
        setDeleteClientDialog(false);
        toast.current?.show({ severity: "success", summary: "Sucesso", detail: "Cliente removido", life: 3000 });
      } catch {
        toast.current?.show({ severity: "error", summary: "Erro", detail: "Erro ao excluir cliente", life: 3000 });
      }
    }
  };

  return { clients, clientDialog, deleteClientDialog, setClientDialog, setDeleteClientDialog, client, setClient, saveClient, deleteClient, toast };
}
