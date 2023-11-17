import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { TopPlay, TopPlayChart as topchart } from "@/components";

const TopPlayChart = topchart as jest.Mock;

jest.mock("next/navigation", () => ({
  useRouter: () => ({ pathname: "/top-charts" }),
}));

jest.mock("../../components/TopPlayChart", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("TopPlay Component", () => {
  it("renders TopPlay component correctly", async () => {
    TopPlayChart.mockReturnValueOnce(
      <div data-testid="mocked-top-play-chart">Mocked TopPlayChart Content</div>
    );

    render(<TopPlay />);

    const headingElement = screen.getByText("Top Charts");
    const seeMoreLink = screen.getByText("See more");
    const topPlayChart = await screen.findByTestId("mocked-top-play-chart");

    expect(headingElement).toBeInTheDocument();
    expect(seeMoreLink).toBeInTheDocument();
    expect(topPlayChart).toBeInTheDocument();
  });

  it("renders Loader when TopPlayChart is in suspense", async () => {
    TopPlayChart.mockImplementationOnce(() => {
      throw new Promise(() => {});
    });

    render(<TopPlay />);

    const loaderElement = await screen.getByAltText("loader");
    expect(loaderElement).toBeInTheDocument();
  });
});
