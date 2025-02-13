import {StaticImageData} from "next/image";

export interface Product {
    id: number,
    name: string,
    price: number,
    // image: string,
    image: StaticImageData,
    description: string,
    availability: "In Stock" | "Out of Stock",
}