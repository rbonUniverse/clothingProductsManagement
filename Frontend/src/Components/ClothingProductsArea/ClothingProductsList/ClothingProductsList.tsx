import ClothingProductsCard from "../ClothingProductCard/ClothingProductCard";
import clothingProductsService from "../../../Services/ProductsServices";
import notifyService from "../../../Services/NotifyService";
import useVerifyUserLoggedIn from "../../../Utils/useVerifyUserLoggedIn";
import ProductModel from "../../../Models/ProductModel";
import Loading from "../../SharedArea/Loading/Loading";
import Header from "../../LayoutArea/Header/Header";
import { Box, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./ClothingProductsList.css";
import { productsStore } from "../../../Redux/ClothingProductsState";

function ClothingProductsList(): JSX.Element {
  // Verify that user is Logged in
  useVerifyUserLoggedIn();

  const [productsLength, setProductsLength] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;
  const [loading, setLoading] = useState(true);

  const [paginatedClothingProducts, setPaginatedProducts] = useState([]);
  const numOfPages = Math.ceil(productsLength / pageSize);

  // Access products from Redux state
  const reduxProducts = useSelector((state: any) => state.products);

  const getProducts = () => {
    clothingProductsService
      .getAllProducts()
      .then((products: any) => {
        setProductsLength(products.length);
        setPaginatedProducts(
          products.slice((pageNumber - 1) * pageSize, pageSize * pageNumber)
        );
      })
      .catch((err: any) => {
        notifyService.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    // Get products from server:
    getProducts();

    const unsubscribe = productsStore.subscribe(() => {
      getProducts();
    });

    // Return a function which will be called when component is about to be destroyed:
    return () => unsubscribe();
  }, []);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
    setPaginatedProducts(
      reduxProducts.slice((value - 1) * pageSize, pageSize * value)
    );
  };

  return (
    <div className="ClothingProductsList">
      <header>
        <Header />
      </header>

      <main style={{ marginBottom: "200px" }}>
        {loading && <Loading />}
        {!loading &&
          paginatedClothingProducts.map((c: ProductModel) => (
            <ClothingProductsCard key={c._id} product={c} />
          ))}
      </main>

      <footer>
        <hr />
        <Box
          justifyContent={"center"}
          alignItems="center"
          display={"flex"}
          sx={{
            margin: "-2px 0px 20px 0px",
          }}
        >
          <Pagination
            count={numOfPages}
            page={pageNumber}
            onChange={handleChange}
          />
        </Box>
      </footer>
    </div>
  );
}

export default ClothingProductsList;
