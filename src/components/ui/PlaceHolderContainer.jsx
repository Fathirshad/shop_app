
import PlaceHolder from "./PlaceHolder"; // Ensure this file exists

const PlaceHolderContainer = () => {
  const placeNumbers = [...Array(12).keys()].slice(0); // Fixed array creation

  return (
    <section className="py-5" id="shop">
      <h4 style={{ textAlign: "center" }}>Our Products</h4> {/* Fixed text alignment */}

      <div className="container px-4 px-lg-5 mt-5">
        <div className="row justify-content-center">
          {placeNumbers.map(num => <PlaceHolder key={num} /> )}
        </div>
      </div>
    </section>
  );
};

export default PlaceHolderContainer;