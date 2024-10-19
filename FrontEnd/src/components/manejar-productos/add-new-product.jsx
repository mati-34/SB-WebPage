import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Plus } from "lucide-react";
import { InputText } from 'primereact/inputtext';






export function AddNewProduct() {
  const [products, setProducts] = useState([])
  const [visible, setVisible] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: '',
    stock: '',
    image: "",
    category: "",
  })

  const handleInputChange = (e) => { 
    const {name, type, value} = e.target
    setNewProduct((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value
    }))
  }

  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.price > 0 && newProduct.stock >= 0) {
      setProducts((prev) => [...prev, { ...newProduct }])

      const data = {
        name: newProduct.name,
        price: newProduct.price,
        stock: newProduct.stock,
        image: newProduct.image,
        category: newProduct.category
      }

      try {
        const response = await fetch('http://localhost:3000/crear-producto', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log('Producto creado:', result);
        } else {
          console.error('Error al crear el producto');
        }
      } catch (err) {
        console.error('Error en la solicitud:', err);
      }

      setNewProduct({
        name: "",
        price: '',
        stock: '',
        image: "",
        category: "",
      })
    }
  }

  return (
    <div>
      <Button icon="pi pi-external-link" onClick={() => setVisible(true)} className='bg-[#E5C0C2] m-3 rounded-lg hover:bg-[#dcb5b7] py-3 px-4 h-10 w-fit font-semibold'><Plus className="mr-2 h-4 w-4 stroke-[3]"/> Añadir Producto</Button>
      <Dialog visible={visible} className='w-[50vw] h-[50vh]' onHide={() => {if (!visible) return; setVisible(false); }}
        content={({ hide }) => (
          <div className="bg-[#E5C0C2] p-5 rounded-xl border-[#8d484c] border-[1px]">
          <header className='mb-6'>
            <h3 className="font-semibold text-xl">Añadir Nuevo Producto</h3>
          </header>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="name" className="">Nombre del producto</label>
                <InputText
                  id="name"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  placeholder="Introducir nombre del producto"
                  autoComplete='off'
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="price" className="">Precio</label>
                <input
                  type='number'
                  id="price"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  placeholder="Introducir precio"
                  min="0"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="stock" className="">Stock</label>
                <input
                  type='number'
                  id="stock"
                  name="stock"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                  placeholder="Introducir stock"
                  min="0"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="category" className="">Categoria</label>
                <InputText
                  id="category"
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  placeholder="Introducir categoria"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="image" className="w-fit">Selecciona una imagen</label>
              <input
                type="file"
                id="image"
                name="image"
                accept='image/*'
                value={newProduct.image}
                onChange={handleInputChange}
                placeholder="Introducir imagen"
                className='checked:bg-green-300 file:bg-[#f6eaeb] file:border-[#8d484c] file:border-[1px] file:rounded-lg p-2 file:hover:bg-[#dcb5b7] file:cursor-pointer'
              />
            </div>
            <div className="flex justify-evenly">
              <Button type="button" onClick={handleAddProduct} className="bg-[#D2979A] m-3 rounded-lg hover:bg-[#c68183] py-3 px-4 h-10 w-fit font-semibold">
                Añadir Producto
              </Button>
              <Button type="button" onClick={hide} className="bg-[#D2979A] m-3 rounded-lg hover:bg-[#c68183] py-3 px-4 h-10 w-fit font-semibold">
                Cerrar
              </Button>
            </div>
          </form>
        </div>
        )}>
        
      </Dialog>
    </div>
  );
}