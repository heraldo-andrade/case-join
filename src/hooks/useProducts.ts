import { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { ProductService } from "@/services/productService";
import { Product } from "@/types/product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [product, setProduct] = useState<Product>({ id: undefined, name: "", price: 0, stock: 0 });
  const toast = useRef<Toast>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setProducts([]);
    const updatedProducts = await ProductService.getProducts();
    setProducts(updatedProducts);
  };

  const saveProduct = async (data: Product) => {
    
    try {
      if (data?.id) {
        await ProductService.updateProduct(data.id, data);
      } else {
        await ProductService.createProduct(data);
      }
      loadProducts();
      setProductDialog(false);
      toast.current?.show({ severity: "success", summary: "Sucesso", detail: "produto salvo", life: 3000 });
    } catch {
      toast.current?.show({ severity: "error", summary: "Erro", detail: "Erro ao salvar produto", life: 3000 });
    }
  };

  const deleteProduct = async () => {
    if (product?.id) {
      try {
        await ProductService.deleteProduct(product.id);
        loadProducts();
        setDeleteProductDialog(false);
        toast.current?.show({ severity: "success", summary: "Sucesso", detail: "produto removido", life: 3000 });
      } catch {
        toast.current?.show({ severity: "error", summary: "Erro", detail: "Erro ao excluir produto", life: 3000 });
      }
    }
  };

  return {
    products,
    productDialog,
    deleteProductDialog,
    setProductDialog,
    setDeleteProductDialog,
    product,
    setProduct,
    saveProduct,
    deleteProduct,
    loadProducts,
    toast,
  };
}
