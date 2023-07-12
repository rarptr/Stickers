import { Shape } from "./shape";

export interface EditorState {
  x: number;
  y: number;
  scale: number;
  shapes: Shape[];
  workspace: Workspace;
}

export type Workspace = {
  width: number,
  height: number,
  scale: number,
  x: number;
  y: number;
};
