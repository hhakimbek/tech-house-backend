import {products} from "../data/db.js";

export function getProducts(req,res){
    return res.status(200).json({
        message: "All products",
        data: products
    });
}

export function getProduct(req,res) {
    const id = req.params.id;
    const product = products.find((e)=>`${e.id}`===id);
    console.log(product);
    if(!product) {
        return res.status(404).json(
            {
                success: false,
                message: "Product doesnt exist in db",
                id: id
            }
        );
    }
    return res.status(200).json(
        {
            succes: true,
            message: "Product found",
            id: id,
            data: product
        }
    );
}

export function createProduct(req,res){
    const {
        name,
        price,
        category,
        stock,
        description,
        image_url
    } = req.body;

    if(
        !name ||
        !price ||
        !category ||
        !stock ||
        !description ||
        !image_url
    ) {
        return res.status(400).json({
            message: "All fields are required!",
            success: false,
            id: id
        });
    }

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const product = {
        name,
        price,
        category,
        stock,
        description,
        image_url,
        createdAt,
        id
    };
    products.push(product);
    return res.status(201).json({
        message: "Product added",
        success: true,
        id: id,
        data: product
    });

}

export function updateProduct(req,res) {
    const id = req.params.id;

    const {
        name,
        price,
        category,
        stock,
        description,
        image_url
    } = req.body;

    if(
        !name ||
        !price ||
        !category ||
        !stock ||
        !description ||
        !image_url
    ) {
        return res.status(400).json({
            message: "All fields are required!",
            success: false
        });
    }


    const product = products.find((e)=>e.id===id);
    if(!product) {
        return res.status(404).json({
            message: "Not Found",
            success: false,
            id: id
        });
    }

    if(
        name===product.name &&
        price===product.price &&
        category===product.category &&
        stock===product.stock &&
        description===product.description &&
        image_url===product.image_url
    ) {
        return res.status(400).json({
            message: "No changes detected",
            success: false
        });
    }
    product.name = name;
    product.price = price;
    product.category = category;
    product.stock = stock;
    product.description = description;
    product.image_url = image_url;
    product.updatedAt = new Date().toISOString();
    return res.status(200).json({
        message: "Product has been changed",
        success: true,
        id: id,
    });

}

export function deleteProduct(req,res) {
    const id = req.params.id;
    const product = products.find((e)=>e.id===id);
    if(!product) {
        return res.status(404).json({
            message: "Not Found",
            success: false
        });
    }
    const index = products.findIndex((e)=>e.id!==id);
    products.splice(index,1);
    return res.status(200).json({
        message: "Product deleted",
        success: true
    });
}