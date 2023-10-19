import { useParams } from "react-router-dom"
import { useGetProductsQuery } from "../../slices/productsApiSlice"
import Loader from "../../components/Loader"
import Container from "../../components/Container"

const ProductListScreen = () => {
    const { keyword, page } = useParams()

    const { data, isLoading, isFetching, error } = useGetProductsQuery({ keyword, page })

    return ( <div className="p-8">
        <Container>
        <div className="flex flex-col items-center justify-center gap-3">
        {isLoading ? (
            <Loader />
        ) : (
            <>
            {data.products.map((product) => (
                <h1>{product.name}</h1>
            ))}
            </>
        )}
        </div>
        </Container>
    </div> 
    )
}
 
export default ProductListScreen;