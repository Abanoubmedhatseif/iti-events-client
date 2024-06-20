import SliderHero from "../components/SliderHero"; // Import SliderHero component
import Categories from "./Categories";
import Footer from "../components/Footer";
import HowItWorks from "./HowItWorks";
function Home() {
  return (
    <div>
      <SliderHero />
      <Categories />
      <HowItWorks />
    </div>
  );
}

export default Home;
