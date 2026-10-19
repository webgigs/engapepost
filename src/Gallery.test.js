import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Gallery from "./Pages/Gallery";
import Lightbox from "./Components/Lightbox";
import { galleryItems, galleryCredits } from "./Data";

/**
 * Photographs by outside photographers must carry their credit. A typo in a
 * galleryCredits key fails silently — the photo just shows uncredited — so
 * these tests check the wiring end to end.
 */
describe("photographer credits", () => {
  it("every credit points at a photograph that is in the gallery", () => {
    const ids = new Set(galleryItems.map((g) => g.id));
    for (const id of Object.keys(galleryCredits)) {
      expect(ids.has(id)).toBe(true);
    }
  });

  it("shows each credit on its photograph in the grid", () => {
    render(
      <MemoryRouter>
        <Gallery />
      </MemoryRouter>
    );
    const credited = galleryItems.filter((g) => g.credit);
    expect(screen.getAllByText(/^Photo: /)).toHaveLength(credited.length);
  });

  it("names the photographer in the lightbox", () => {
    const item = galleryItems.find((g) => g.credit);
    render(<Lightbox items={[item]} index={0} onClose={() => {}} onNavigate={() => {}} />);
    expect(screen.getByText(`Photo: ${item.credit}`)).toBeInTheDocument();
  });

  it("adds no credit line to the organisation's own photographs", () => {
    const item = galleryItems.find((g) => !g.credit);
    render(<Lightbox items={[item]} index={0} onClose={() => {}} onNavigate={() => {}} />);
    expect(screen.queryByText(/^Photo: /)).not.toBeInTheDocument();
  });
});
