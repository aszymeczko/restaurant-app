import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import styles from "./Item.module.scss";
import { updateTable } from "../../../redux/tablesRedux";
import Loader from "../../common/Loader/Loader";

const Item = ({ currentTable, setCurrentTable, loading }) => {
  const availableStatuses = ["Free", "Reserved", "Busy", "Cleaning"];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (value, field) => {
    setCurrentTable({
      ...currentTable,
      [field]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTable(currentTable)).then(() => navigate(`/`));
  };

  return (
    !loading &&
    !!Object.keys(currentTable).length && (
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
                {availableStatuses.map((status) => (
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
    )
  );
};

export default Item;
