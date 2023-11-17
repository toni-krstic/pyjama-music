import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Loader } from "@/components";

describe("Loader Component", () => {
  it("renders Loader component correctly without title", () => {
    const { getByAltText, getByText } = render(<Loader />);

    expect(getByAltText("loader")).toBeInTheDocument();
    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("renders Loader component correctly with title", () => {
    const { getByAltText, getByText } = render(
      <Loader title="custom loading" />
    );

    expect(getByAltText("loader")).toBeInTheDocument();
    expect(getByText("custom loading")).toBeInTheDocument();
  });
});
