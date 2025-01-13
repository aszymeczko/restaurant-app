import { ButtonGroup, Col, Row } from "react-bootstrap";
import Button from "../../common/Button/Button";
import styles from "./List.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeTable } from "../../../redux/tablesRedux";
import Loader from "../../common/Loader/Loader";

const List = () => {
  const { loading, tables, error } = useSelector((state) => state.tables);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (loading) return <Loader />;

  if (error) return "error...";

  const handleClick = (id) => {
    navigate(`/table/${id}`);
  };

  const handleRemove = (id) => {
    dispatch(removeTable(id));
  };

  return (
    <>
      {tables &&
        tables.map((table) => (
          <Row key={table.id} className={styles.listItem}>
            <Col xs={2}>
              <h3>Table {table.id}</h3>
            </Col>
            <Col xs={8}>
              <b>Status:</b> <span>{table.status}</span>
            </Col>
            <Col>
              <ButtonGroup>
                <Button
                  onClick={() => handleClick(table.id)}
                  text={"Show more"}
                />
                <Button
                  onClick={() => handleRemove(table.id)}
                  text={"Remove"}
                />
              </ButtonGroup>
            </Col>
          </Row>
        ))}
    </>
  );
};

export default List;
