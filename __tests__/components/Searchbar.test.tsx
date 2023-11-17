import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";

import { Searchbar } from "@/components";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Searchbar Component", () => {
  it("renders Searchbar component correctly", () => {
    const { getByLabelText, getByPlaceholderText } = render(<Searchbar />);

    expect(getByLabelText("Search all songs")).toBeInTheDocument();
    expect(getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("handles form submission correctly", async () => {
    const mockRouter = {
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    const { getByPlaceholderText, getByTestId } = render(<Searchbar />);

    fireEvent.change(getByPlaceholderText("Search"), {
      target: { value: "example" },
    });

    fireEvent.submit(getByTestId("search-form"));

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/search/example");
    });
  });
});
