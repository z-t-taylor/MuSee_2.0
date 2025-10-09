import ArtworkPage from "./art/page";
import { Micro_5 } from "next/font/google";

const micro5Font = Micro_5({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <>
      <div className="flex md:hidden justify-center">
        <h1
          className={`mx-4 my-3 text-[#2d1707] ${micro5Font.className} text-[4rem]`}
        >
          MuSee
        </h1>
      </div>
      <ArtworkPage />
    </>
  );
}
