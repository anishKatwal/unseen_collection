import Contact from "../components/home/Contact";
import FeaturedItem from "../components/home/FeaturedItem";
import Features from "../components/home/Features";
import Footer from "../components/Footer";
import Hero from "../components/home/Hero";

const Home = () => {
  return (
    <main>
      <Hero />
      <Features />
      <FeaturedItem />
      <Contact />
      <Footer />
    </main>
  );
};

export default Home;
