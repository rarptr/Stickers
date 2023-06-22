import React, { useCallback } from "react";

import { SHAPE_TYPES } from "./constants";
import { useShapes } from "./state";
import { Circle } from "./Circle";
import { Rectangle } from "./Rectangle";
import { SelectedShape, State } from "./types";

type ShapeComponentProps = {
  shape: SelectedShape;
}

export default function ShapeComponent({ shape }: ShapeComponentProps) {
  const { id, type } = shape;

  const isSelectedSelector = useCallback(
    (state: State) => {
      return state.selected === id;
    },
    [id]
  );

  const isSelected = useShapes(isSelectedSelector);

  if (type === SHAPE_TYPES.RECT) {
    return <Rectangle shape={shape} isSelected={isSelected} />;
  } else if (type === SHAPE_TYPES.CIRCLE) {
    return <Circle shape={shape} isSelected={isSelected} />;
  }

  return null;
}
