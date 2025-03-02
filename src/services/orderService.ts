import { OrderSchema } from '@/components/pages/orders/OrderForm';
import { Order } from '@/types/order';
import axios from 'axios';

const API_URL = 'http://localhost:5000/orders';

export class OrderService {
  static async getOrders() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao buscar pedidos.');
    }
  }

  static async getOrderById(id: string) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao buscar pedido.');
    }
  }

  static async createOrder(orderData: OrderSchema) {
    
    try {
      const response = await axios.post(API_URL, orderData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao criar pedido.');
    }
  }

  static async updateOrder(id: string, orderData: Order) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, orderData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao atualizar pedido.');
    }
  }

  static async deleteOrder(id: string | null) {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao excluir pedido.');
    }
  }
}
