"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  UserExhibition,
  UserExhibitionArtwork,
} from "@/types/userExhibitionTypes";
import { generateSlug } from "../utils/generateSlug";
import { generateUniqueSlug } from "../utils/generateUniqueSlug";

interface ExhibitionCache {
  exhibitions: UserExhibition[];
  selectedArtworks: UserExhibitionArtwork[];
  addArtwork: (artwork: UserExhibitionArtwork, exhibitionId?: string) => void;
  removeArtwork: (id: string) => void;
  createExhibit: (title: string, description: string) => UserExhibition;
  removeExhibit: (exhibitionId: string) => void;
}

export const userExhibitCache = create<ExhibitionCache>()(
  persist(
    (set, get) => ({
      exhibitions: [],
      selectedArtworks: [],
      addArtwork(artwork, exhibitionId) {
        if (exhibitionId) {
          set({
            exhibitions: get().exhibitions.map((exhibition) => {
              if (exhibition.exhibitionId === exhibitionId) {
                const exists = exhibition.artworks.some(
                  (art) => art.id === artwork.id
                );

                return {
                  ...exhibition,
                  artworks: exists
                    ? exhibition.artworks
                    : [...exhibition.artworks, artwork],
                  updatedAt: exists ? exhibition.updatedAt : new Date(),
                };
              }
              return exhibition;
            }),
          });
        } else {
          set({ selectedArtworks: [...get().selectedArtworks, artwork] });
        }
      },
      removeArtwork(id) {
        set({
          selectedArtworks: get().selectedArtworks.filter(
            (art) => art.id !== id
          ),
          exhibitions: get().exhibitions.map((exhibition) => ({
            ...exhibition,
            artworks: exhibition.artworks.filter((art) => art.id !== id),
          })),
        });
      },
      createExhibit(title, description) {
        const duplicateSlug = get().exhibitions.map(
          (exhibition) => exhibition.slug ?? ""
        );
        const slug = generateUniqueSlug(title, duplicateSlug);
        const newExhibition: UserExhibition = {
          exhibitionId: crypto.randomUUID(),
          title,
          slug,
          description: description?.trim() || undefined,
          artworks: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set({ exhibitions: [...get().exhibitions, newExhibition] });
        return newExhibition;
      },
      removeExhibit(exhibitionId) {
        set({
          exhibitions: get().exhibitions.filter(
            (exhibition) => exhibition.exhibitionId !== exhibitionId
          ),
        });
      },
    }),
    {
      name: "user-exhibitions-store",
      partialize: (state) => ({
        exhibitions: state.exhibitions,
        selectedArtworks: state.selectedArtworks,
      }),
    }
  )
);
