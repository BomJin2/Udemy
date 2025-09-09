import { useParams } from "react-router-dom";

function ProductsDetailPage() {
  const params = useParams();

  const productId = params.id;
  return <div>{productId}</div>;
}
export default ProductsDetailPage;
