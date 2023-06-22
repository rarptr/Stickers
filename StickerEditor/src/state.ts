import { createStore } from "@halka/state";
import { produce } from "immer";
import { nanoid } from "nanoid";

import { SHAPE_TYPES, DEFAULTS, LIMITS } from "./constants";
import { Point, Shape, State } from "./types";
import { Circle as KonvaCircle } from "konva/lib/shapes/Circle";
import { clamp } from "./utils";
import { KonvaEventObject } from "konva/lib/Node";

const APP_NAMESPACE = "integrtr_diagrams";

const baseState: State = {
  selected: null,
  shapes: {},
};

export const useShapes = createStore<State>(() => {
  const initialState: Record<string, Shape> | null =
    JSON.parse(localStorage.getItem(APP_NAMESPACE) ?? "{}");

  return { ...baseState, shapes: initialState ?? {} };
});

const setState = (fn: (state: State) => void) =>
  useShapes.set(produce(fn));

export const saveDiagram = () => {
  const state = useShapes.get();
  localStorage.setItem(APP_NAMESPACE, JSON.stringify(state.shapes));
};

export const reset = () => {
  localStorage.removeItem(APP_NAMESPACE);
  useShapes.set(baseState);
};

export const createRectangle = ({ x, y }: Point) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.RECT,
      width: DEFAULTS.RECT.WIDTH,
      height: DEFAULTS.RECT.HEIGHT,
      fill: DEFAULTS.RECT.FILL,
      stroke: DEFAULTS.RECT.STROKE,
      rotation: DEFAULTS.RECT.ROTATION,
      x,
      y,
    };
  });
};

export const createCircle = ({ x, y }: { x: number; y: number }) => {
  setState((state) => {
    state.shapes[nanoid()] = {
      type: SHAPE_TYPES.CIRCLE,
      radius: DEFAULTS.CIRCLE.RADIUS,
      fill: DEFAULTS.CIRCLE.FILL,
      stroke: DEFAULTS.CIRCLE.STROKE,
      x,
      y,
    };
  });
};

export const selectShape = (id: string) => {
  setState((state) => {
    state.selected = id;
  });
};

export const clearSelection = () => {
  setState((state) => {
    state.selected = null;
  });
};

export const moveShape = (id: string, event: KonvaEventObject<DragEvent>) => {
  setState((state) => {
    const shape = state.shapes[id];

    if (shape) {
      shape.x = event.target.x();
      shape.y = event.target.y();
    }
  });
};

export const updateAttribute = <T extends keyof Shape>(attr: T, value: Shape[T]): void => {
  setState((state: State) => {
    if (!state.selected) {
      return;
    }

    const shape = state.shapes[state.selected];
    if (shape) {
      shape[attr] = value;
    }
  });
};

export const transformRectangleShape = (
  node: any,
  id: string,
) => {
  const scaleX = node.scaleX();
  const scaleY = node.scaleY();

  node.scaleX(1);
  node.scaleY(1);

  setState((state) => {
    const shape = state.shapes[id];

    if (shape) {
      shape.x = node.x();
      shape.y = node.y();

      shape.rotation = node.rotation();

      shape.width = clamp(
        node.width() * scaleX,
        LIMITS.RECT.MIN,
        LIMITS.RECT.MAX
      );
      shape.height = clamp(
        node.height() * scaleY,
        LIMITS.RECT.MIN,
        LIMITS.RECT.MAX
      );
    }
  });
};

export const transformCircleShape = (circle: KonvaCircle, id: string) => {
  const scaleX = circle.scaleX();

  circle.scaleX(1);
  circle.scaleY(1);

  setState((state) => {
    const shape = state.shapes[id];

    if (shape) {
      shape.x = circle.x();
      shape.y = circle.y();

      shape.radius = clamp(
        circle.width() * scaleX / 2,
        LIMITS.CIRCLE.MIN,
        LIMITS.CIRCLE.MAX
      );
    }
  });
};