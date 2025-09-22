import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

let CartContext = createContext()
export function CartProvider({children}){
    let initialCart = JSON.parse(localStorage.getItem("cart")) || [];
    let[cart, setcart] = useState(initialCart)
    let token = localStorage.getItem('token')
    let userId = localStorage.getItem('userId')
   

    // when local storage chane, change the cart also
    useEffect(() => {
         localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(()=>{
        fetch(`https://mern-1-restaurant-backend.vercel.app/cart/${userId}`,{
            headers:{
                'Authorization': `Bearer ${token}`
            },
        })
        .then(resp=>resp.json())
        .then(data=>setcart(data.data.cart.items))
    },[])
    // 1- add to cart
    
    let addToCart = async(menu, qty)=>{
    let newCart = [...cart, { menu, qty }];
    setcart(newCart); 

    let resp = await fetch(`https://mern-1-restaurant-backend.vercel.app/cart/${userId}`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body:JSON.stringify({menu, qty})
            });
    let data = await resp.json();
    if(resp.ok){
        setcart(data.data.cart.items);
    } else {
        setcart(cart); 
    }
}


    //2-to updateCart
    let updateCart = async(menu, qty)=>{
        let resp = await fetch(`https://mern-1-restaurant-backend.vercel.app/cart/updateCart`,{
            method:'PATCH',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({userId, menu, qty})
        })
        let data = await resp.json()
        setcart(data.data.cart.items)
    }

    // 3- to remove from cart
    let deleteFromCart = async(menu, userId)=>{
        let resp = await fetch(`https://mern-1-restaurant-backend.vercel.app/cart/remove`,{
            method:'DELETE',
            headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, menu }),
        })
        let data = await resp.json()
        setcart(data.data.cart.items)
    }

    //4- to delete all items and make cart empty
    let EmptyCart = async(userId)=>{
        let resp = await fetch(`https://mern-1-restaurant-backend.vercel.app/cart/remove/${userId}`,{
            method:'DELETE',
            })
        let data = await resp.json()
        if(resp.ok){
            setcart([])
            // setcart({})
        }
        
    }

    return (
    <CartContext.Provider value={{ cart, addToCart, updateCart, deleteFromCart, EmptyCart }}>
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  return useContext(CartContext);
}
