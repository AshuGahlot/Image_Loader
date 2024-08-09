import React, { useEffect, useState } from "react";

function ImageLoader() {
  const [loading, setloading] = useState(false);
  const [products, setproducts] = useState([]);
  const [count, setcount] = useState(0);
  const [disablebtn,setdisablebtn] = useState(false);

  async function fetchProduct() {
    try {
      setloading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0 : count * 20
        }`
      );
      const result = await response.json();
      if (result && result.products && result.products.length) {
        setproducts((prevData) => [...prevData, ...result.products]);
        setloading(false);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  }

    //   for disable load more button when limit data fullfilled
    useEffect(() => {
        if(products && products.length == 100) setdisablebtn(true)
    },[products])
    

//   for fetching API on component mounting
  useEffect(() => {
    fetchProduct();
  },[count]);
  if(loading) {
    return <div className="text-4xl text-center font-bold mt-32">Loading Data ! Please Wait</div>
  }
  return (
    <>
      <h1 className="text-4xl text-center font-bold underline mt-5">Image Loader</h1>
      <div className="mx-20 grid mt-10">
        <div className="grid grid-cols-4 gap-7 text-center">
        {
            products && products.length?
            products.map(item => <div className="w-full border-2 border-slate-900 rounded-xl" key={item.id}>
                <img 
                src={item.thumbnail} 
                alt={item.title}
                />
                <p>{item.title}</p>
            </div>)
            
            :null
        }
        </div>
        <div className="w-full flex justify-center">
        <button className="w-auto p-4 text-white font-bold hover:scale-105 hover:bg-green-500 mt-5 bg-green-400 rounded-lg" disabled={disablebtn} onClick={() => setcount( count + 1)}>Load More </button>
        </div>
      </div>
    </>
  );
}

export default ImageLoader;
