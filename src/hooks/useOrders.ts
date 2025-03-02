import { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { OrderService } from "@/services/orderService";
import { Order } from "@/types/order";
import { OrderSchema, ProductSchema } from "@/components/pages/orders/OrderForm";
import { useProducts } from "./useProducts";
import { ProductService } from "@/services/productService";

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderDialog, setOrderDialog] = useState(false);
  const [newOrderDialog, setNewOrderDialog] = useState(false);
  const [deleteOrderDialog, setDeleteOrderDialog] = useState(false);
  const [order, setOrder] = useState<Order>({
    id: "",
    client: {
      id: "",
      name: "",
    },
    items: [],
    total: 0,
    status: "new",
    date: "",
    quantityTotal: 0
  });
  const toast = useRef<Toast>(null);

  const { saveProduct, loadProducts } = useProducts();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    OrderService.getOrders().then(setOrders);
  };

  const getProductById = async (productOrder: ProductSchema) => {
    try {
      const data = await ProductService.getProductById(productOrder.productId);
      const newStock = data.stock === 0 ? 0 : data.stock - productOrder.quantity;
      saveProduct({...data, stock: newStock})
  
    } catch {
      console.error("Erro ao buscar ou atualizar o produto");
    }
  };

  const saveOrder = async (data: OrderSchema) => {    
    try {
      await OrderService.createOrder(data);
      await Promise.all(data.items.map((item) => getProductById(item)));
      await loadProducts();
      loadOrders();

      setNewOrderDialog(false);
      toast.current?.show({
        severity: "success",
        summary: "Sucesso",
        detail: "Pedido salvo",
        life: 3000,
      });
    } catch {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Erro ao salvar pedido",
        life: 3000,
      });
    }
  };
  
  const updateOrder = async (data: Order) => {
    try {
      if(data?.id){
        await OrderService.updateOrder(data?.id, data);
        loadOrders();
        setOrderDialog(false);
        toast.current?.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Pedido atualizado",
          life: 3000,
        });
      }
    } catch {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Erro ao atualizar o pedido",
        life: 3000,
      });
    }
  };

  const deleteOrder = async () => {
    if (order?.id) {
      try {
        await OrderService.deleteOrder(order.id);
        loadOrders();
        setDeleteOrderDialog(false);
        toast.current?.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Pedido removido",
          life: 3000,
        });
      } catch {
        toast.current?.show({
          severity: "error",
          summary: "Erro",
          detail: "Erro ao excluir pedido",
          life: 3000,
        });
      }
    }
  };

  return {
    orders,
    orderDialog,
    deleteOrderDialog,
    setOrderDialog,
    setDeleteOrderDialog,
    newOrderDialog,
    setNewOrderDialog,
    order,
    setOrder,
    saveOrder,
    deleteOrder,
    updateOrder,
    toast,
  };
}
