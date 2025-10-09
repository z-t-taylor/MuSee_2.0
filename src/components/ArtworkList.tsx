"use client";

import { useEffect, useState } from "react";
import { MasonryGrid } from "@/components/MasonryGrid";
import { Artwork } from "@/types/artworkType";

export const ArtworkList = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await fetch("/api/combined?limit=20");
        if (!res.ok) throw new Error("Failed to fetch");
        const { data } = await res.json();
        setArtworks(data);
      } catch (err) {
        console.error("Error fetching artworks: ", err);
        setError("Failed to load artworks");
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <MasonryGrid
        items={artworks}
        getKey={(item) => item.id}
        renderItem={(item) => (
          <img
            src={item.image.imageURL}
            alt={item.image.altText}
            className="rounded-2xl"
          />
        )}
      />
    </>
  );
};
