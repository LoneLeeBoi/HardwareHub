import { Banner } from "./components/blocks/Banner";
import { CategorySelection } from "./components/blocks/CategorySelection";
import { PopularProducts } from "./components/blocks/PopularProducts";
import { Products } from "./components/blocks/Products";
export default function Home() {
  return (
    <>
      <div className="container">
     
        <Banner />
        <CategorySelection />
        <PopularProducts />
        <Products />
      </div>
    </>
  );
}
