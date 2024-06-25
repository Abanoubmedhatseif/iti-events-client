import SliderHero from "../components/SliderHero"; // Import SliderHero component
import Categories from "./Categories";
import Footer from "../components/Footer";
import HowItWorks from "./HowItWorks";
import HappeningEventsPage from "./HappeningEventsPage"
function Home() {
  return (
    <div>
      <SliderHero />
      <Categories />
      <HowItWorks />
      <HappeningEventsPage />
    </div>
  );
}

export default Home;
