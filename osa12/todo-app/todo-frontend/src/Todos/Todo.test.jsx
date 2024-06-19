import { render, screen } from "@testing-library/react";
import Todo from "./Todo";

test("todo is rendered correctly", () => {
  const todo = {
    _id: "1",
    text: "Finish fullstack course",
    done: false,
  };

  const onClickDeleteMock = vi.fn();
  const onClickCompleteMock = vi.fn();

  render(
    <Todo
      todo={todo}
      onClickDelete={onClickDeleteMock}
      onClickComplete={onClickCompleteMock}
    />,
  );

  expect(screen.getByText("Finish fullstack course")).toBeInTheDocument();
  expect(screen.getByText("This todo is not done")).toBeInTheDocument();
});

test("todo complete button works", () => {
  const todo = {
    _id: "1",
    text: "Buy milk",
    done: false,
  };

  const onClickDeleteMock = vi.fn();
  const onClickCompleteMock = vi.fn();

  render(
    <Todo
      todo={todo}
      onClickDelete={onClickDeleteMock}
      onClickComplete={onClickCompleteMock}
    />,
  );

  screen.getByText("Set as done").click();
  expect(onClickCompleteMock).toHaveBeenCalledWith(todo);
});
