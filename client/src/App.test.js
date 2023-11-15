import React from "react";
import { render } from "@testing-library/react";
import axios from "axios";
import App from "./App";

jest.mock("axios");

const mockData = {
  characters: [
    { name: "Mickey Mouse", imageUrl: "mickey.jpg" },
    { name: "Donald Duck", imageUrl: "donald.jpg" },
  ],
  selectedCharacter: { name: "Mickey Mouse", imageUrl: "mickey.jpg" },
};

describe("App component", () => {
  beforeEach(() => {
    axios.post.mockResolvedValue({ data: mockData });
  });

  test("renders without crashing", async () => {
    render(<App />);
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
  });

  test("displays the character image and options", async () => {
    const { getByText, getByAltText } = render(<App />);
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    expect(getByText("Who is this character?")).toBeInTheDocument();
    expect(getByAltText("Mickey Mouse")).toBeInTheDocument();
    expect(getByText("Mickey Mouse")).toBeInTheDocument();
    expect(getByText("Donald Duck")).toBeInTheDocument();
  });

  test("increments the score on correct answer", async () => {
    const { getByText } = render(<App />);
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    const correctOption = getByText("Mickey Mouse");
    fireEvent.click(correctOption);

    await waitFor(() => expect(getByText("Score: 1")).toBeInTheDocument());
  });

  test("resets the score and question counter after 5 questions", async () => {
    const { getByText } = render(<App />);
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    const correctOption = getByText("Mickey Mouse");
    for (let i = 0; i < 5; i++) {
      fireEvent.click(correctOption);
      await waitFor(() =>
        expect(getByText(`Score: ${i + 1}`)).toBeInTheDocument()
      );
    }

    expect(
      getByText("You answered 5 questions. Your score is: 5")
    ).toBeInTheDocument();
    expect(axios.post).toHaveBeenCalledTimes(6);
    expect(getByText("Score: 0")).toBeInTheDocument();
  });
});
