import SliderHero from "../components/SliderHero"; // Import SliderHero component
import Categories from "./Categories";
import Footer from "../components/Footer";
import HowItWorks from "./HowItWorks";
import UpcomingEventsPage from "./UpcomingEventsPage"
import HomeHappingEvents from "./HomeHappingEvents";
import RealityViewOfOurEvent from "./RealityViewOfOurEvent"
 
function Home() {
  return (
    <div>
      <SliderHero />
      <Categories />
      <HomeHappingEvents />


      <UpcomingEventsPage />
      <HowItWorks />
      <RealityViewOfOurEvent />

      
    </div>
  );
}

export default Home;
