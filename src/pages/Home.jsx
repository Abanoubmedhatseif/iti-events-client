import SliderHero from "../components/SliderHero"; // Import SliderHero component
import Categories from "./Categories";
import Footer from "../components/Footer";
import HowItWorks from "./HowItWorks";
import UpcomingEventsPage from "./UpcomingEventsPage"
import HomeHappingEvents from "./HomeHappingEvents";
import RealityViewOfOurEvent from "./RealityViewOfOurEvent"
import RidePage from "./RidePage"
 
function Home() {
  return (
    <div>
      <SliderHero />
      <Categories />
      <HomeHappingEvents />


      <UpcomingEventsPage />
      <HowItWorks />
      <RealityViewOfOurEvent />
      <RidePage />

      
    </div>
  );
}

export default Home;
