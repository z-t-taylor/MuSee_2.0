import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "@/components/SearchBar";

describe("SearchBar", () => {
  it("renders with correct placeholder text", () => {
    render(<SearchBar onSearch={() => {}} placeholder="Search" />);
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });
  it("calls onSearch when typing and submitting", () => {
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "Monet" } });

    const form = input.closest("form")!;
    fireEvent.submit(form);

    expect(handleSearch).toHaveBeenCalledWith("Monet");
  });
  it("does not call onSearch when no input has been entered", () => {
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} placeholder="Search" />);

    const input = screen.getByPlaceholderText("Search");
    const form = input.closest("form")!;
    fireEvent.submit(form);

    expect(handleSearch).not.toHaveBeenCalledWith();
  });
  it("renders a button with accessible role", () => {
    render(<SearchBar onSearch={() => {}} placeholder="Search" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
