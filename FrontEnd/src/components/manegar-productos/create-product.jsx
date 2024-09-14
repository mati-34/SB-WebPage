import React, { useRef } from 'react';

export function CreateProduct() {
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const productImageRef = useRef(null);

  const NewProduct = async (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const price = priceRef.current.value;
    const image = productImageRef.current.value;

    const product = {
      nombre: name,
      precio: price,
      imagen: image,
    };

    try {
      const response = await fetch('http://localhost:3000/manegar-productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
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
  };

  return (
    <form>
      <input id="name" placeholder="Nombre del producto.." autoComplete='off' ref={nameRef} required />
      <input type="number" id="price" placeholder="Precio del producto.." autoComplete='off' ref={priceRef} required />
      <input type="file" accept="image/*" id="prouct-photo" placeholder="Imagen del producto.." ref={productImageRef} required />
      <button id="btn" onClick={NewProduct}>Crear Producto</button>
    </form>
  );
}
