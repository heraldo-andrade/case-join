import axios from 'axios';

const API_URL = 'http://localhost:5000/products';

export class ProductService {
  static async getProducts() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.log(error)
      throw new Error('Erro ao buscar produtos.');
    }
  }

  static async getProductById(id: string) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.log(error)
      throw new Error('Erro ao buscar produto.');
    }
  }

  static async createProduct(clientData: { name: string; price: number; stock: number }) {
    try {
      const response = await axios.post(API_URL, clientData);
      return response.data;
    } catch (error) {
      console.log(error)
      throw new Error('Erro ao criar produto.');
    }
  }

  static async updateProduct(id: string, clientData: { name: string; price: number; stock: number }) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, clientData);
      return response.data;
    } catch (error) {
      console.log(error)
      throw new Error('Erro ao atualizar produto.');
    }
  }

  static async deleteProduct(id: string | null) {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao excluir produto.');
    }
  }
}
