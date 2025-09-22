import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Navbar", () => {
  it("renders all nav links", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    render(<Navbar />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Exhibits")).toBeInTheDocument();
    expect(screen.getByText("Museums")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });
  it("applies an underline to an active link", () => {
    (usePathname as jest.Mock).mockReturnValue("/exhibits");
    render(<Navbar />);

    expect(screen.getByText("Exhibits")).toHaveClass("underline");
  });
  it("does not apply an underline to an inactive link", () => {
    (usePathname as jest.Mock).mockReturnValue("/about");
    render(<Navbar />);

    expect(screen.getByText("Home")).not.toHaveClass("underline");
  });
});
