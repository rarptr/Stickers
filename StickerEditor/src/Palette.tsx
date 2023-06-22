import React from "react";

import { DRAG_DATA_KEY, SHAPE_TYPES } from "./constants";

const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
  const type = event.currentTarget.dataset.shape;
  if (type) {
    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;

    const clientWidth = event.currentTarget.clientWidth;
    const clientHeight = event.currentTarget.clientHeight;

    const dragPayload = JSON.stringify({
      type,
      offsetX,
      offsetY,
      clientWidth,
      clientHeight,
    });

    event.dataTransfer.setData(DRAG_DATA_KEY, dragPayload);
  }
};

export function Palette() {
  return (
    <aside className="palette">
      <h2>Shapes</h2>
      <div
        className="shape rectangle"
        data-shape={SHAPE_TYPES.RECT}
        draggable
        onDragStart={handleDragStart}
      />
      <div
        className="shape circle"
        data-shape={SHAPE_TYPES.CIRCLE}
        draggable
        onDragStart={handleDragStart}
      />
    </aside>
  );
}
