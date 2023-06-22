
export type Shape = {
  type: string;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  rotation?: number;
  x: number;
  y: number;
  radius?: number;
};

export type SelectedShape = Shape & {
  id: string;
};

export type State = {
  selected: string | null;
  shapes: { [key: string]: Shape };
}

export type Point = {
  x: number;
  y: number;
}