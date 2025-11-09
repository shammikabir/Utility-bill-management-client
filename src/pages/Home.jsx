import React from "react";
import { useLoaderData } from "react-router";
import Banner from "../component/Banner";
import Categories from "../component/Categories";

const Home = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      <Banner></Banner>
      <Categories></Categories>
    </div>
  );
};

export default Home;
