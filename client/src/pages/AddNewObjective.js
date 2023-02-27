import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./LearningObj.css";

function AddNewObjective({ handleSubmitObj }) {
  const [obj, setObj] = useState("");
  const [selectedOption, setSelectedOption] = useState("option1");
  const handleOptionChange = (event) => setSelectedOption(event.target.value);

  function handleChangeObj(e) {
    setObj(e.target.value);
  }

  const handleSubmitPost = async (e, objective) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/learning_objectives", {
        skill_id: selectedOption.slice(-1),
        objective: obj,
      });
      if (res.status === 200) {
        const newObjective = {
          skill_id: selectedOption.slice(-1),
          objective: objective,
        };
        handleSubmitObj(newObjective);
        alert(res.data.message);
      } else {
        throw new Error("Failed to save the objective");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="d-flex align-items-center">
      <Form onSubmit={handleSubmitPost}>
        <DropdownButton
          id="dropdown-basic-button"
          title={`Skill ${selectedOption}`}
        >
          <Dropdown.Item
            onClick={() => handleOptionChange({ target: { value: "option1" } })}
          >
            Option 1
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleOptionChange({ target: { value: "option2" } })}
          >
            Option 2
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleOptionChange({ target: { value: "option3" } })}
          >
            Option 3
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleOptionChange({ target: { value: "option4" } })}
          >
            Option 4
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleOptionChange({ target: { value: "option5" } })}
          >
            Option 5
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleOptionChange({ target: { value: "option6" } })}
          >
            Option 6
          </Dropdown.Item>
        </DropdownButton>

        <Form.Group className="mb-3">
          <Form.Control
            className="form-control"
            style={{ marginTop: "1em" }}
            required
            placeholder=" New Learning Objective"
            type="text"
            value={obj}
            onChange={handleChangeObj}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="btn-block">
          Submit Objective
        </Button>
      </Form>
    </div>
  );
}
export default AddNewObjective;
