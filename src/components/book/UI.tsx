import { atom } from "jotai";

export const pages = [
  {
    front: "cover",
    back: "page1",
  },
  {
    front: "page2",
    back: "page3",
  },
  {
    front: "page4",
    back: "page5",
  },
  {
    front: "page6",
    back: "cover-back",
  },
];

export const pageAtom = atom(0);

export const BookUI = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
      <div className="absolute bottom-8 left-8 text-white">
        <p className="text-sm opacity-60">Click on the book edges to turn pages</p>
      </div>
    </div>
  );
}; 