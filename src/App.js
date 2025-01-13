import "bootstrap/dist/css/bootstrap.min.css";

import { Container } from "react-bootstrap";
import Header from "./components/features/Header/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./components/views/Home/Home";
import NotFound from "./components/pages/NotFound";
import Footer from "./components/features/Footer/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTables } from "./redux/tablesRedux";
import AddTable from "./components/views/AddTable/AddTable";
import TableView from "./components/views/TableView/TableView";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table/:tableId" element={<TableView />} />
        <Route path="/add-new-table" element={<AddTable />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;
