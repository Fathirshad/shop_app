import HomeCard from "./HomeCard"

const CardContainer = ({ products }) => {
  // const placeNumber = [...Array(12).key()].slite(0);
  return (
    <section className="py-5" id="shop">
      <h4 style={{ textAlign: "center" }} >Our Products</h4>
      <div className="container px-4 px-lg-5 mt-5"> 
       <div className="row justify-content-center"> 
          
          {products.map(product => <HomeCard key={product.id} product={product} />)}
        
          {/* <p style={{ textAlign: "center" }}>Products</p> */}
        
        </div>
      </div>
    </section>
  );
};

export default CardContainer;