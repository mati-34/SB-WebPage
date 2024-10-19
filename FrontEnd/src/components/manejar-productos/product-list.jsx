import { InputText } from "primereact/inputtext"
import { Search } from "lucide-react"
import { useState, useEffect } from 'react';
import { Image } from 'primereact/image';
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import loadDirective from "astro/runtime/client/load.js";
        
        


export function ProductList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState(null)
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/obtener-productos', {
          method: 'GET',
        });
        
        if (!response.ok) {
          throw new Error('Error fetching products');
        }
        
        const data = await response.json();
        setProducts(data);
        
        console.log(data);
      } catch (error) {
        console.error('Error fetching products:', error); 
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (product) => {
    console.log(product)
      try {
      const response = await fetch('http://localhost:3000/eliminar-producto', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: product._id }),
      });
      
      if (!response.ok) {
        throw new Error('Error fetching products');
      }
      
      setProducts((prev) => prev.filter((product) => product.id !== products._id))
    } catch (error) {
      console.error('Error fetching products:', error); 
    } finally {
      setIsLoading(false);
    }
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
  }

  const handleUpdateProduct = () => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? editingProduct : p))
      )
      setEditingProduct(null)
    }
  }
  
  
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return <div className="container mx-auto p-4 text-center">Cargando...</div>
  }
  return(
    <div className="w-full bg-slate-200 pb-4 shadow-lg">
      <div className="w-full h-16 bg-[#E5C0C2] flex justify-center items-center">
        <h3 className="text-2xl font-semibold size-fit">PRODUCTOS</h3>
      </div>
      <div className="mt-4 flex flex-row">
        <div className=" w-64 ml-8 h-full">
          <Search className=" absolute mt-1 ml-1" />
          <InputText
            placeholder="Buscar productos..."
            className="pl-8 bg-[#D2979A] rounded-xl text-black placeholder-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <div className="w-full">
        {products.length === 0 ? (
            <p className="text-center text-gray-500">No hay productos</p>
          ) : (
            <div>
              <header>
                <div className="bg-blue-50 grid grid-cols-6 text-lg">
                  <h4 className="text-[#8d484c] font-medium">Imagen</h4>
                  <h4 className="text-[#8d484c] font-medium">Nombre</h4>
                  <h4 className="text-[#8d484c] font-medium">Categoría</h4>
                  <h4 className="text-[#8d484c] font-medium">Precio</h4>
                  <h4 className="text-[#8d484c] font-medium">Stock</h4>
                </div>
              </header>
              <div>
                {filteredProducts.map((product) => (
                  <div key={product.id} className="hover:bg-blue-50 grid grid-cols-6">
                    <div>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="font-medium">{product.name}</div>
                    <div>{product.category}</div>
                    <div>${product.price.toFixed(2)}</div>
                    <div>{product.stock}</div>
                    <div>
                      <button onClick={() => handleEditProduct(product)} className="text-blue-600 hover:bg-blue-50">
                        <Pencil className="mr-2 h-4 w-4" />
                      </button>
                      <button onClick={() => handleDeleteProduct(product)} className="text-red-600 hover:bg-red-50">
                        <Trash2 className="mr-2 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>


    </div>
  )  
}
