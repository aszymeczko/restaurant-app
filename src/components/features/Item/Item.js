import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row, Spinner } from "react-bootstrap";
import styles from "./Item.module.scss";
import { updateTable } from "../../../redux/tablesRedux";
const Item = () => {
  const avalibleStatuses = ["Free", "Reserved", "Busy", "Cleaning"];
  const { tableId } = useParams();
  const [currentTable, setCurrentTable] = useState({});
  const { loading, tables, error } = useSelector((state) => state.tables);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (tables?.length) {
      setCurrentTable(() => tables.find((table) => table.id === tableId));
    }
  }, [tableId, loading, tables]);

  if (loading)
    return (
      <Spinner animation="border" role="status" className={"my-4"}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  if (error) return "Error...";

  const handleChange = (value, field) => {
    setCurrentTable({
      ...currentTable,
      [field]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTable(currentTable));
  };

  return (
    <>
      <div className={styles.title}>
        <h1>Table {tableId}</h1>
      </div>
      {!loading && !!Object.keys(currentTable).length && (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="status">
            <Row className={"align-items-center"}>
              <Col xs={1} className={"pt-2"}>
                <Form.Label>Status: </Form.Label>
              </Col>
              <Col xs={3}>
                <Form.Select
                  value={currentTable.status}
                  onChange={(e) => handleChange(e.target.value, "status")}
                >
                  {avalibleStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="people">
            <Row className={"align-items-center"}>
              <Col xs={1} className={"pt-2"}>
                <Form.Label> People: </Form.Label>
              </Col>
              <Col xs={1}>
                <Form.Control
                  type="number"
                  value={currentTable.peopleAmount}
                  max={currentTable.maxPeopleAmount}
                  min={0}
                  onChange={(e) => handleChange(e.target.value, "peopleAmount")}
                  placeholder="Enter number of clients"
                />
              </Col>
              /
              <Col xs={1}>
                <Form.Control
                  type="number"
                  value={currentTable.maxPeopleAmount}
                  disabled
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Row className={"align-items-center"}>
              <Col xs={1}>
                <Form.Label>Bill: </Form.Label>
              </Col>
              $
              <Col xs={1}>
                <Form.Control
                  type="number"
                  min={0}
                  value={currentTable.bill}
                  onChange={(e) => handleChange(e.target.value, "bill")}
                />
              </Col>
            </Row>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </>
  );
};

export default Item;
