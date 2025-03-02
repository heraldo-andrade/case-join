'use client'

import { Dialog } from "primereact/dialog";
import { Order } from "@/types/order";
import { DataTable } from "primereact/datatable";
import { formatCurrency } from "@/utils/formatCurrentUtils";
import { Column } from 'primereact/column';
import { useEffect, useState } from "react";
import { ClientService } from "@/services/clientService";
import { Client } from "@/types/clients";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Status } from "@/types/status";
import { Button } from "primereact/button";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";

interface OrderDetailProps {
  visible: boolean;
  onHide: () => void;
  order: Order;
  updateOrder: (order: Order) => void;
}

export interface ProductOrder {
  productName: string
  price: number
  productId: string
  quantity: number
}

export function OrderDetail({ visible, onHide, order, updateOrder }: OrderDetailProps) {

  const [orderClient, setOrderClient] = useState<Client | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Status>(order?.status);

  const status = [
      { name: 'Novo', value: 'new' },
      { name: 'Pendente', value: 'pending' },
      { name: 'Concluído', value: 'completed' },
      { name: 'Cancelado', value: 'cancelled' }
  ];

  useEffect(() => {
    setSelectedStatus(order?.status)
  }, [order, onHide])

  const getClientById = async (order: Order) => {
    try {
      const data = await ClientService.getClientById(order.client.id);
      setOrderClient(data);
    } catch {
      console.error("Erro ao buscar cliente");
    }
  }

  useEffect(() => {
    if(visible){
      getClientById(order)
    }else{
      setOrderClient(null)
    }
  }, [visible, order]);

  const footerGroup = (
    <div className="flex justify-end text-purple-primary">
      <div>Total:</div>
        <div className="ml-5">{formatCurrency(order?.total)}</div>
    </div>
  );

  const priceBodyTemplate = (order: ProductOrder) => {
    return formatCurrency(order?.price);
  };

  const updateOrderStatus = () => {
    const newOrder = {
      ...order,
      status: selectedStatus,
    };
    updateOrder(newOrder)
  }

  const accept = () => {
    updateOrderStatus()
  };

  const confirm = (event: React.MouseEvent<HTMLButtonElement>) => {
      confirmPopup({
          target: event.currentTarget,
          message: 'Tem certeza que deseja atualizar o status do pedido?',
          icon: 'pi pi-exclamation-triangle',
          defaultFocus: 'reject',
          accept,
          acceptLabel: 'Sim',
          rejectLabel: 'Não'

      });
  };

  return (
    <Dialog
      visible={visible}
      style={{ width: '50rem' }}
      breakpoints={{ '960px': '75vw', '641px': '90vw' }}
      header="Detalhes do Pedido"
      modal
      className="p-fluid"
      onHide={onHide}
    >
      <div>
        <div className="field border-t border-b py-5 border-gray-300">
          <div className="font-bold mb-2 text-custom-purple">Dados do Cliente</div>
          <div className="flex flex-col">
            <span>id: {orderClient?.id}</span>
            <span>Nome: {orderClient?.name}</span>
            <span>E-mail: {orderClient?.email}</span>
            <span>Telefone: {orderClient?.phone}</span>
          </div>
        </div>

        <div className="mb-6 border-b py-5 border-gray-300">
          <div className="font-bold mb-2 text-custom-purple">Status do pedido</div>
          <div className="flex justify-center gap-4">
            <div className="flex-1 w-full">
              <Dropdown
                value={selectedStatus}
                onChange={(e: DropdownChangeEvent) => setSelectedStatus(e.value)}
                options={status}
                optionLabel="name" 
                placeholder="Alterar status do pedido" className="w-full md:w-14rem"
              />
            </div>
            <div>
              <ConfirmPopup />
              <div className="card flex flex-wrap gap-2 justify-content-center">
                  <Button onClick={confirm} icon="pi pi-check" label="Atualizar status" severity="success"></Button>
              </div>
            </div>
          </div>
        </div>

        <div className="field mb-4">
        <div className="font-bold mb-2 text-custom-purple">Produtos do pedido</div>
          <DataTable
            value={order.items}
            footer={footerGroup}
          >
            <Column field="productId" header="id"></Column>
            <Column field="productName" header="Nome" className="w-full"></Column>
            <Column field="quantity" header="Quantidade"></Column>
            <Column field="price" header="Preço unitário" body={priceBodyTemplate}></Column>
          </DataTable>
        </div>
      </div>
    </Dialog>
  );
}
