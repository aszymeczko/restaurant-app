import Item from "../../features/Item/Item";
import { useParams } from "react-router-dom";

const TableView = () => {
  const { tableId } = useParams();
  return (
    <>
      <div className="pt-4 pb-3">
        <h1>Table {tableId}</h1>
      </div>
      <Item />
    </>
  );
};
export default TableView;
