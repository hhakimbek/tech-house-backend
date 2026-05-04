import {cartItems, products} from "../data/db.js";
import {v4 as uuidv4} from "uuid";

export async function viewCart(req,res) {
    const userId = req.headers['x-user-id'];
    const userCart = cartItems.find((item)=> item.user_id == userId);

    if(!userCart) {
        const newCart = {
            id: uuidv4(),
            user_id: userId,
            products:[],
            quantity: 0,
        };
        return res.status(200).json(newCart);
    }
    const cardWithProducts = {
        ...userCart,
        products: userCart.products.map((item)=>{
            const product = products.find((p)=>p.id==item.id);
            return {
                ...product,
                quantity: item.quantity,
            };
        }),
    };

    return res.status(200).json(cardWithProducts);
}

export async function addToCart(req,res) {
    const userId = req.headers['x-user-id'];
    const { productId } = req.body;

    const product = products.find((p)=>p.id == productId);
    if(!product) {
        return res.status(404).json({message:"Product not found"});
    }

    let userCart = cartItems.find((item)=>item.user_id == userId);

    if(!userCart) {
        userCart = {
            id: uuidv4(),
            user_id: userId,
            products: [],
            quantity: 0
        };
        cartItems.push(userCart);
    }

    const existingProduct = userCart.products.find((item)=>item.id == productId);

    if(existingProduct) {
        // 🔥 har bosganda +1
        existingProduct.quantity += 1;
    } else {
        // 🔥 yangi bo‘lsa 1 dan boshlanadi
        userCart.products.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image_url,
            quantity: 1
        });
    }

    // 🔥 umumiy quantity
    userCart.quantity = userCart.products.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    return res.status(201).json({
        message:"Added to cart!",
        cart: userCart
    });
}

export async function updateCartItem(req, res) {
    const userId = req.headers['x-user-id'];
    const {productId,quantity} = req.body;
    const product = products.find((p)=>p.id==productId);
    if(!product) {
        return res.status(404).json({message:"Product not found"});
    }
    let userCart = cartItems.find((item)=>item.user_id==userId);
    if(!userCart) {
        return res.status(404).json({message:"Cart not found"});
    }
    const existingProduct = userCart.products.find((item)=>item.id==productId);
    if(existingProduct) {
        existingProduct.quantity = quantity;
    } else {
        return res.status(404).json({message:"Cart Product not found"});
    }
    userCart.quantity = userCart.products.reduce((sum,item)=>sum+item.quantity,0);
    return res.status(201).json({message:"Product update!"});
}

export async function removeCartItem() {}






