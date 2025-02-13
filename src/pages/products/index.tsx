import {useEffect, useMemo, useState} from "react";
import {Product} from "@/types/Product";
import Image from "next/image";
import Link from "next/link";
import {DefaultButton} from "@/ui/Buttons";
import {useRouter} from "next/router";

export default function Products() {

    const router = useRouter();

    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");

    const filteredProducts: Product[] = useMemo(() => {
        return products.filter((el) => el.name.toLowerCase().includes(searchText.toLowerCase()));
    }, [searchText, products]);

    useEffect(() => {
        setIsLoading(true);
        fetch("/api/products")
            .then((res) => {
                if (!res.ok)
                    throw new Error("Failed to fetch products");
                return res.json()
            })
            .then((data) => setProducts(data))
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    }, []);


    if (isLoading) return <p>Loading...</p>;
    if (!isLoading && products.length === 0) return <p>Products not found</p>

    return (
        <div className={"w-full min-h-screen bg-white px-4 sm:px-8 py-4"}>
            <DefaultButton text={"← Back to menu"} onclick={() => router.push("/")} customStyles={"w-fill self-center myу-8"}/>

            <h4 className={"text-3xl font-bold text-blue-600 text-center mt-2"}>Products</h4>
            <input
                type={"text"}
                placeholder={"Search products..."}
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                className={"m-4 border-b-gray-400 text-black"}
            />
            <ul className={"grid grid-cols-1 md:grid-cols-4 gap-4 p-4"}>
                {
                    products && filteredProducts.map((product) => <li key={product.id} className={"flex flex-col justify-end p-5 bg-white rounded border-2 border-r-gray-400 border-b-gray-400"}>
                        <Image
                            src={product.image} alt={`${product.name} name`}
                            width={0} height={200}
                            className={"self-center pb-4"}
                        />
                        <h2 className={"text-black font-bold"}>{product.name}</h2>
                        <p className={"text-gray-600"}>{product.price}$</p>
                        <Link href={`/products/${product.id}`}>
                            <DefaultButton text={"View details"} customStyles={"w-full"}/>
                        </Link>
                    </li>)
                }
            </ul>
        </div>
    )
}