import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import EventListItem from "./EventListItem";
import "@testing-library/jest-dom";
import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { apiUrl } from "../../utils/apiUrl";
import Toast from "../Toast/Toast";

const eventListItem = {
  id: "1",
  name: "John",
  surname: "Doe",
  email: "john.doe@example.com",
  date: new Date(),
};

describe("EventListItem", () => {
  const setForceFetchAfterDelete: Dispatch<SetStateAction<boolean>> = jest.fn();
  const setForceFetchAfterUpdate: Dispatch<SetStateAction<boolean>> = jest.fn();
  const setToastInfo: Dispatch<SetStateAction<object>> = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <>
        <Toast message="" color="" />
        <EventListItem
          setToastInfo={setToastInfo}
          setForceFetchAfterUpdate={setForceFetchAfterUpdate}
          setForceFetchAfterDelete={setForceFetchAfterDelete}
          {...eventListItem}
        />
      </>
    );
  });
  test("renders event data and delete button", () => {
    expect(screen.getByText(/John/)).toBeInTheDocument();
    expect(screen.getByText(/Doe/)).toBeInTheDocument();
    expect(screen.getByText(/john\.doe@example\.com/)).toBeInTheDocument();
    expect(screen.getByText(/2023/)).toBeInTheDocument();
    expect(screen.getByText(/X/)).toBeInTheDocument();
  });

  test("handles delete event", async () => {
    jest.spyOn(axios, "delete").mockResolvedValueOnce({});
    expect(screen.getByText(/John/)).toBeInTheDocument();
    expect(screen.getByText(/Doe/)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/X/));

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        `${apiUrl}/api/v1/event/${eventListItem.id}`
      );
      expect(setForceFetchAfterDelete).toHaveBeenCalledWith(true);
    });
    expect(setForceFetchAfterDelete).toHaveBeenCalledTimes(1);
  });

  test("update and cancel button works", async () => {
    expect(screen.getByText(/John/)).toBeInTheDocument();
    expect(screen.getByText(/Doe/)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Update/));

    expect(screen.getByText(/Save/)).toBeInTheDocument();
    expect(screen.queryByText(/Update/)).toBeNull();
    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Cancel/));

    expect(screen.getByText(/Name/)).toBeInTheDocument();
    expect(screen.getByText(/Update/)).toBeInTheDocument();
    expect(screen.queryByText(/Save/)).toBeNull();
  });

  test("handles update event", async () => {
    const updatedEvent = {
      id: "1",
      name: "Mary",
      surname: "Doe",
      email: "john.doe@example.com",
      date: new Date(),
    };
    jest.spyOn(axios, "patch").mockResolvedValueOnce(updatedEvent);

    fireEvent.click(screen.getByText(/Update/));
    fireEvent.change(screen.getByLabelText(/Name/), {
      target: { value: "Mary" },
    });
    fireEvent.click(screen.getByText(/Save/));
    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalledWith(
        `${apiUrl}/api/v1/event/${eventListItem.id}?name=Mary`
      );
      expect(setForceFetchAfterUpdate).toHaveBeenCalledWith(true);
    });
    expect(setForceFetchAfterUpdate).toHaveBeenCalledTimes(1);
  });
});
