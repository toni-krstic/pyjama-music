import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Sidebar } from "@/components/Sidebar";

describe("Sidebar Component", () => {
  it("renders Sidebar component correctly", () => {
    const { getAllByText, getByTestId } = render(<Sidebar />);

    expect(getAllByText("Pyjama Music")[0]).toBeInTheDocument();

    const mobileMenu = getByTestId("mobile-menu");
    expect(mobileMenu).toHaveClass("-left-full");
  });

  it("toggles mobile menu correctly", () => {
    const { getByTestId } = render(<Sidebar />);

    fireEvent.click(getByTestId("open-mobile-menu"));

    const mobileMenu = getByTestId("mobile-menu");
    expect(mobileMenu).toHaveClass("left-0");

    fireEvent.click(getByTestId("close-mobile-menu"));

    expect(mobileMenu).toHaveClass("-left-full");
  });

  it("handles link click correctly", () => {
    const { getAllByText, getByTestId } = render(<Sidebar />);

    fireEvent.click(getByTestId("open-mobile-menu"));

    fireEvent.click(getAllByText("Around You")[1]);

    const mobileMenu = getByTestId("mobile-menu");
    expect(mobileMenu).toHaveClass("-left-full");
  });
});
