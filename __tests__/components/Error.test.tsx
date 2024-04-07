import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Error } from "@/components/Error";

describe("Error Component", () => {
  it("renders Error component correctly", () => {
    const { getByText } = render(<Error />);

    expect(
      getByText("Something went wrong. Please try again.")
    ).toBeInTheDocument();
  });
});
