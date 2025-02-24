import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/houseplant.css";
import Navigation from "../components/Navigation";

const HouseplantCare = () => {
  const [selectedPlant, setSelectedPlant] = useState(null);

  const toggleInfo = (plantId) => {
    console.log("Toggling plant:", plantId);
    setSelectedPlant(selectedPlant === plantId ? null : plantId);
  };

  const plants = [
    { id: "snakePlant", img: "snake.webp", name: "Snake Plant" },
    { id: "cyclamen", img: "Cyclamen.jpg", name: "Cyclamen" },
    { id: "pothos", img: "Pothos.webp", name: "Pothos" },
    // { id: "inchPlant", img: "Inch Plant.jpg", name: "Inch Plant" },
    // { id: "peaceLily", img: "Peace Lily.avif", name: "Peace Lily" },
    // { id: "ponytailPalm", img: "Ponytail Palm.jpg", name: "Ponytail Palm" },
    // { id: "spiderPlant", img: "Spider plant.avif", name: "Spider Plant", link: "/Houseplant" },
    { id: "hyacinth", img: "Hyacinth.webp", name: "Hyacinth" },
    // { id: "elephantEar", img: "Elephant Ear.webp", name: "Elephant Ear" }
  ];

  return (
    <div>
        <Navigation />
    <div className="houseplant-container">

      {/* Title Section */}
      <div className="title">
        <h1>Our Complete Guide to Houseplant Care</h1>
        <p>
          Whether you're a beginner or a seasoned plant lover, this guide has everything you need to nurture your houseplants.
        </p>
      </div>

      {/* Big Image */}
      <div className="bigimg">
        <img src="/images/houseplant big image.jpg" alt="Houseplant Guide" />
      </div>

      <div className="styled-heading">
        <span>Get the Know-How on Caring for Your Favorite Houseplants</span>
      </div>

      {/* Description */}
      <div className="explain">
        When it comes to choosing which specific houseplants you want to grow and care for, the possibilities are seemingly endless.
        To make things trickier, almost every plant will have slightly different needs in order to thrive. Luckily, we’re here to give you the Know-How to become a proud plant-parent.
        Below are a few of the most popular houseplants, including some you may be growing in your home right now. Click on the image to learn more.
      </div>

      {/* Plants Grid */}
      <div className="images">
        {plants.map((plant) => (
          <div 
            key={plant.id} 
            className="box" 
            onClick={() => plant.link ? null : toggleInfo(plant.id)}
            style={{ cursor: plant.link ? "default" : "pointer" }}
          >
            {plant.link ? (
              <Link to={plant.link}>
                <img src={`/images/${plant.img}`} alt={plant.name} />
                <p>{plant.name}</p>
              </Link>
            ) : (
              <>
                <img src={`/images/${plant.img}`} alt={plant.name} />
                <p>{plant.name}</p>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Plant Information (Shown When Clicked) */}
      {selectedPlant === "snakePlant" && (
        <div className={`plant-info ${selectedPlant === "snakePlant" ? "active" : ""}`} >
          <span className="close" onClick={() => setSelectedPlant(null)}>&times;</span>
          <h1 className="heading">Snake Plant Care</h1>
          <h2>Quick Facts about Snake Plants</h2>
          <ul>
            <li>Botanical name - <span>Dracaena trifasciata, Sansevieria</span></li>
            <li>Height - 2 to 4 feet (0.6 to 1.2 m)</li>
            <li>Spread - 1 to 2 feet (0.3 to 0.6 m)</li>
            <li>Sun exposure - Partial shade</li>
            <li>Soil requirements - Well-drained potting mix</li>
            <li>Hardiness zones - 10 to 12</li>
            <li>When to plant - Year-round indoors</li>
          </ul>

          <div className="benefits">
            <h2>Snake Plant Benefits</h2>
            <p>
              The snake plant is a striking and attractive foliage plant. The most common species grown indoors in North America,
              it has tall, striped, and sword-shaped leaves. It purifies indoor air and is incredibly easy to care for.
            </p>
          </div>

          <div className="guidelines">
            <h2>Snake Plant Care Guidelines</h2>
            <p>
              Give it a sturdy container with high-quality potting mix, a spot in bright, indirect light, and occasional water, and it will thrive.
              You can let it dry out between waterings and water very little in the winter.
            </p>
          </div>

          <div className="requirements">
            <h2>Snake Plant Soil & Light Requirements</h2>
            <p>
              Good drainage is essential, so the container should have holes in the bottom and the soil should be light.
              A snake plant only needs a few hours of direct light per day.
            </p>
          </div>

          <div className="water">
            <h2>How Often to Water a Snake Plant</h2>
            <p>
              Water regularly during the growing season, but avoid overwatering. In winter, you can reduce watering to just once every month or two.
            </p>
          </div>

          <div className="fertilizer">
            <h2>Fertilizer for Snake Plant</h2>
            <p>
              Snake plants do not require much fertilizer. Use a balanced fertilizer prepared at half strength, once a month during the growing season.
            </p>
          </div>

          <div className="propagation">
            <h2>Snake Plant Propagation & Repotting</h2>
            <p>
              Leaf cuttings or dividing rhizomes are the best propagation methods. Be sure to use a well-draining soil.
              Repot every 3 to 5 years.
            </p>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default HouseplantCare;

