import Item from "../../features/Item/Item";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../../common/Loader/Loader";

const TableView = () => {
  const { tableId } = useParams();
  const [currentTable, setCurrentTable] = useState({});
  const { loading, tables, error } = useSelector((state) => state.tables);

  useEffect(() => {
    if (tables?.length) {
      setCurrentTable(() => tables.find((table) => table.id === tableId));
    }
  }, [tableId, loading, tables]);

  if (loading) return <Loader />;
  if (error) return "Error...";

  return (
    <>
      <div className="pt-4 pb-3">
        <h1>Table {tableId}</h1>
      </div>
      <Item
        loading={loading}
        currentTable={currentTable}
        setCurrentTable={setCurrentTable}
      />
    </>
  );
};
export default TableView;
