import type {NextApiRequest, NextApiResponse} from "next";
import {Product} from "@/types/Product";
import LaptopImg from "../../../public/images/laptop.jpg";
import PhoneImg from "../../../public/images/phone.jpg";
import HeadphoneImg from "../../../public/images/headphones.jpg";


// const products: Product[] = [
//     { id: 1, name: "Laptop", price: 1200, image: "/images/laptop.jpg", description: "A powerful laptop suitable for gaming, programming, and creative work. Equipped with the latest technology for maximum performance.", availability: "In Stock",},
//     { id: 2, name: "Phone", price: 800, image: "/images/phone.jpg", description: "A sleek and powerful smartphone with an excellent camera, perfect for everyday use and multimedia.", availability: "Out of Stock",},
//     { id: 3, name: "Headphones", price: 150, image: "/images/headphones.jpg", description: "High-quality wireless headphones with noise cancellation for an immersive audio experience.", availability: "In Stock",},
// ];
const products: Product[] = [
    { id: 1, name: "Laptop", price: 1200, image: LaptopImg, description: "A powerful laptop suitable for gaming, programming, and creative work. Equipped with the latest technology for maximum performance.", availability: "In Stock",},
    { id: 2, name: "Phone", price: 800, image: PhoneImg, description: "A sleek and powerful smartphone with an excellent camera, perfect for everyday use and multimedia.", availability: "Out of Stock",},
    { id: 3, name: "Headphones", price: 150, image: HeadphoneImg, description: "High-quality wireless headphones with noise cancellation for an immersive audio experience.", availability: "In Stock",},
];

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Product[]>,
) {
    res.status(200).json(products);
}
