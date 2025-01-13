import { useState } from "react";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { addTable } from "../../../redux/tablesRedux";
import { useNavigate } from "react-router-dom";

const NewTableForm = () => {
  const [table, setTable] = useState({
    status: "Free",
    peopleAmount: 0,
    maxPeopleAmount: 0,
    bill: 0,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const availableStatuses = ["Free", "Reserved", "Busy", "Cleaning"];

  const handleChange = (value, field) => {
    setTable({
      ...table,
      [field]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTable(table)).then(() => navigate(`/`));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="status">
        <Row className={"align-items-center"}>
          <Col xs={1} className={"pt-2"}>
            <Form.Label>Status: </Form.Label>
          </Col>
          <Col xs={3}>
            <Form.Select
              value={table.status}
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
              value={table.peopleAmount}
              max={table.maxPeopleAmount}
              min={0}
              onChange={(e) => handleChange(e.target.value, "peopleAmount")}
              placeholder="Enter number of clients"
            />
          </Col>
          /
          <Col xs={1}>
            <Form.Control
              type="number"
              value={table.maxPeopleAmount}
              min={0}
              onChange={(e) => handleChange(e.target.value, "maxPeopleAmount")}
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
              value={table.bill}
              onChange={(e) => handleChange(e.target.value, "bill")}
            />
          </Col>
        </Row>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default NewTableForm;
