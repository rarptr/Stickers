import React, { useRef, useCallback } from "react";
import { Layer, Stage as KonvaStage } from "react-konva";

import {
  useShapes,
  clearSelection,
  createCircle,
  createRectangle,
  saveDiagram,
  reset,
} from "./state";

import { DRAG_DATA_KEY, SHAPE_TYPES } from "./constants";
import ShapeComponent from "./ShapeComponent";
import { Stage } from "konva/lib/Stage";


const handleDragOver = (event: React.DragEvent<HTMLElement>) =>
  event.preventDefault();

export function Canvas() {
  const shapes = useShapes((state) => Object.entries(state.shapes));
  const stageRef = useRef<Stage>(null);

  const handleDrop = useCallback((event: React.DragEvent<HTMLElement>) => {
    const draggedData = event.dataTransfer.getData(DRAG_DATA_KEY);

    if (draggedData && stageRef.current) {
      const { offsetX, offsetY, type, clientHeight, clientWidth } = JSON.parse(draggedData);
      stageRef.current.setPointersPositions(event);

      const coords = stageRef.current.getPointerPosition();
      if (coords == null) {
        return;
      }

      if (type === SHAPE_TYPES.RECT) {
        createRectangle({
          x: coords.x - offsetX,
          y: coords.y - offsetY,
        });
      }
      else if (type === SHAPE_TYPES.CIRCLE) {
        createCircle({
          x: coords.x - (offsetX - clientWidth / 2),
          y: coords.y - (offsetY - clientHeight / 2),
        });
      }
    }
  }, []);

  return (
    <main className="canvas"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="buttons">
        <button onClick={saveDiagram}>Save</button>
        <button onClick={reset}>Reset</button>
      </div>
      <KonvaStage
        ref={stageRef}
        width={window.innerWidth - 400}
        height={window.innerHeight}
        onClick={clearSelection}
      >
        <Layer>
          {shapes.map(([key, shape]) => {
            return (<ShapeComponent key={key} shape={{ id: key, ...shape }} />
            )
          })
          }
        </Layer>
      </KonvaStage>
    </main>
  );
}
