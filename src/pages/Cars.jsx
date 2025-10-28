import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/cars";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch cars");
      const data = await res.json();
      setCars(data);
    } catch (err) {
      setError("Could not load cars. Is your JSON server running?");
    }
  }

  return (
    <div className="page-container">
      <h1>Available Cars</h1>
      {error && <p className="error">{error}</p>}
      <div className="cars-grid">
        {cars.map((car) => (
          <div key={car.id} className="car-card">
            <img src={car.image} alt={`${car.make} ${car.model}`} />
            <h3>{car.make} {car.model}</h3>
            <p>Year: {car.year}</p>
            <p>Price per day: ${car.pricePerDay}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
