import React, { Component } from "react";
import "./Todo.css";
import axios from "axios";
import {
  Button,
  Container,
  Card,
  Row,
  ListGroup,
  ListGroupItem,
  InputGroup,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";

interface Todo {
  id?: string;
  description: string;
  deadline?: Date;
  checkedTime?: Date;
}

export class TodoComponent extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      todoDescription: "",
      todoDeadlineDate: "",
      todoDeadlineTime: "",
      todoList: [],
    };
  }

  changeHandler = (e: any) => {
    let name = e.target.name;
    let val = e.target.value;
    this.setState({
      [name]: val,
    });
  };

  loadTodos() {
    axios.get("/api/get").then((response) => {
      if (response.data && response.data !== "") {
        this.setState({
          todoList: response.data,
        });
      }
    });
  }

  componentDidMount() {
    this.loadTodos();
  }

  submit = () => {
    if (this.state.todoDescription.trim() === "") return;

    let newItem: Todo = {
      description: this.state.todoDescription,
    };

    let datetimeStr = "";
    if (this.state.todoDeadlineDate.trim() !== "") {
      datetimeStr += this.state.todoDeadlineDate;
    }
    if (this.state.todoDeadlineTime.trim() !== "") {
      if (this.state.todoDeadlineDate.trim() === "") {
        datetimeStr = new Date().toISOString();
      } else {
        datetimeStr += " " + this.state.todoDeadlineTime;
      }
    }

    if (datetimeStr !== "") {
      newItem = {
        ...newItem,
        deadline: new Date(datetimeStr),
      };
    }

    console.log(newItem);

    this.setState({
      todoDescription: "",
      todoDeadlineDate: "",
      todoDeadlineTime: "",
    });
    axios.post("/api/insert", newItem).then(() => {
      console.log("POST", newItem);
      this.loadTodos();
    });
  };

  delete = (id: string) => {
    if (window.confirm("Do you want to delete? ")) {
      axios.delete(`/api/delete/${id}`).then(() => {
        this.loadTodos();
      });
    }
  };

  check = (id: string) => {
    axios.put(`/api/check/${id}`, this.state).then(() => {
      this.loadTodos();
    });
  };

  onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      this.submit();
    }
  };

  formatDate = (date: string) => {
    if (date) {
      var newDate = new Date(date);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(newDate);
    }
  };

  render() {
    let todo = this.state.todoList.map((val: any, key: any) => {
      return (
        <React.Fragment key={val.id}>
          <Card style={{ width: "18rem" }} className="m-2">
            <Card.Body>
              <Card.Text>{val.description}</Card.Text>
            </Card.Body>

            <ListGroup className="list-group-flush">
              {val.deadline && (
                <ListGroupItem>
                  Deadline: {this.formatDate(val.deadline)}
                </ListGroupItem>
              )}
              {val.checkedTime && (
                <ListGroupItem>
                  Checked on: {this.formatDate(val.checkedTime)}
                </ListGroupItem>
              )}
            </ListGroup>

            <Card.Body>
              {!val.checkedTime && (
                <Button
                  variant="success"
                  className="m-2"
                  onClick={() => {
                    this.check(val.id);
                  }}
                >
                  Check
                </Button>
              )}
              <Button
                variant="danger"
                onClick={() => {
                  this.delete(val.id);
                }}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        </React.Fragment>
      );
    });

    return (
      <div className="App">
        <h1>To-do list</h1>
        <div className="form">
          <Form>
            <InputGroup className="mb-3">
              <input
                type="text"
                name="todoDescription"
                placeholder="Start typing and hit 'Enter'"
                maxLength={50}
                value={this.state.todoDescription}
                onChange={this.changeHandler}
                onKeyDown={this.onKeyDown}
              />
              <Form.Control
                name="todoDeadlineDate"
                onChange={this.changeHandler}
                min={new Date().toISOString().split("T")[0]}
                type="date"
              />
              <Form.Control
                name="todoDeadlineTime"
                onChange={this.changeHandler}
                type="time"
              />
              <Button
                type="reset"
                className="submitTodo"
                variant="primary"
                onClick={this.submit}
              >
                Ok
              </Button>
            </InputGroup>
          </Form>
        </div>
        <div>
          <Container>
            <Row>{todo}</Row>
          </Container>
        </div>
      </div>
    );
  }
}
