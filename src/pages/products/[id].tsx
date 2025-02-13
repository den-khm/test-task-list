import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Product} from "@/types/Product";
import Image from "next/image";
import {DefaultButton} from "@/ui/Buttons";

export default function ProductDetail() {

    const router = useRouter();
    const { id } = router.query;

    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleBackClick = () => {
        if (window.history.length > 2) {
            router.back();
        } else {
            router.push("/products");
        }
    }

    useEffect(() => {
        if (!id) return;

        setIsLoading(true);
        fetch("/api/products")
            .then((res) => {
                if (!res.ok)
                    throw new Error("Failed to fetch product");
                return res.json()
            })
            .then((data) => {
                const foundProduct = data.find((el: Product) => el.id === Number(id));
                setProduct(foundProduct)
            })
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    }, [router.isReady, id]);


    if (isLoading) return <p>Loading...</p>;
    if (!isLoading && !product) return <p>Product not found</p>

    return (
        <div className="w-full min-h-screen bg-white flex justify-center">
            {
                product &&
                <div className={"py-6 flex flex-col items-center max-w-4xl px-4 sm:px-6"}>
                    <h2 className="text-black text-3xl sm:text-4xl font-bold text-center">{product.name}</h2>
                    {/*<Image*/}
                    {/*    src={product.image} alt={"product image"}*/}
                    {/*    width={0} height={400}*/}
                    {/*    className={"self-center pb-4"}*/}
                    {/*/>*/}
                    <Image
                        src={"/headphones.jpg"} alt={"product image"}
                        width={100} height={400}
                        className={"self-center pb-4 w-fit h-[400px]"}
                    />
                    <p className="text-black text-xl sm:text-2xl font-bold">{product.price}$</p>
                    <p className={`text-black text-xl sm:text-2xl font-bold ${product.availability === "In Stock" ? "text-green-700" : "text-red-700"}`}>{product.availability}</p>
                    <p className="text-black text-lg sm:text-xl pt-8">{product.description}</p>
                    <DefaultButton text={"← Back"} onclick={handleBackClick} customStyles={"w-fill sm:w-auto self-center mt-6 px-8 sm:px-14"}/>
                </div>
            }
        </div>
    )
}