import React from "react";

import Banner from "../component/Banner";
import Categories from "../component/Categories";
import RecentBiils from "../component/RecentBiils";
import WhyChooseUs from "../component/WhyChooseUs";
import FAQSection from "../component/FAQSection";
import Footer from "../component/Footer";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Categories></Categories>
      <RecentBiils></RecentBiils>
      <WhyChooseUs></WhyChooseUs>
      <FAQSection></FAQSection>
      <Footer></Footer>
    </div>
  );
};

export default Home;
