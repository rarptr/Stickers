import { EditorState } from "../types/editor";

export const baseState: EditorState = {
  x: 100,
  y: 200,
  scale: 1,
  shapes: [
    { id: 1, x: 30, y: 60, width: 110, height: 210 },
    // { x: 5, y: 5, width: 20, height: 20 },
    // { x: 2, y: 3, width: 15, height: 15 },
    // { x: 8, y: 1, width: 12, height: 12 },
    // { x: 4, y: 6, width: 18, height: 18 }
  ],
  workspace: {
    width: 0,
    height: 0,
    scale: 0,
    x: 0,
    y: 0,
  },
}