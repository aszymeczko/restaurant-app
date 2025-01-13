import List from "../../features/List/List";
import styled from "./Home.module.scss";

const Home = () => {
  return (
    <>
      <div className={styled.title}>
        <h1>All tables</h1>
      </div>

      <List />
    </>
  );
};

export default Home;
