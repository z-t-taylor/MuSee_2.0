import { render, screen } from "@testing-library/react";
import { MasonryGrid } from "@/components/MasonryGrid";

const mockItems = [
  { id: "1", title: "Sunflowers", imageURL: "/image1.jpg" },
  { id: "2", title: "Waterlilies", imageURL: "/image2.jpg" },
  { id: "3", title: "Starry Night", imageURL: "/image3.jpg" },
];

describe("MasonryGrid", () => {
  it("renders all items", () => {
    render(
      <MasonryGrid
        items={mockItems}
        getKey={(item) => item.id}
        renderItem={(item) => <img src={item.imageURL} alt={item.title} />}
      />
    );

    expect(screen.getByAltText("Sunflowers")).toBeInTheDocument();
    expect(screen.getByAltText("Waterlilies")).toBeInTheDocument();
    expect(screen.getByAltText("Starry Night")).toBeInTheDocument();
  });
});
