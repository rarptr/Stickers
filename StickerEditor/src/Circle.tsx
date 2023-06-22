import React, { useRef, useEffect, useCallback } from "react";
import { Circle as KonvaCircle, Transformer as KonvaTransformer } from "react-konva";

import { LIMITS } from "./constants";
import { selectShape, transformCircleShape, moveShape } from "./state";
import { Box } from "konva/lib/shapes/Transformer";
import { SelectedShape } from "./types";
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";

const boundBoxCallbackForCircle = (oldBox: Box, newBox: Box): Box => {
  if (
    newBox.width < LIMITS.CIRCLE.MIN ||
    newBox.height < LIMITS.CIRCLE.MIN ||
    newBox.width > LIMITS.CIRCLE.MAX ||
    newBox.height > LIMITS.CIRCLE.MAX
  ) {
    return oldBox;
  }
  return newBox;
};

type CircleProps = {
  shape: SelectedShape;
  isSelected: boolean
}

export function Circle({ shape, isSelected }: CircleProps) {
  const { id, type, ...shapeProps } = shape;

  const shapeRef = useRef<Konva.Circle>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (isSelected && transformerRef.current && shapeRef.current) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const handleSelect = useCallback(
    (event: KonvaEventObject<MouseEvent>) => {
      event.cancelBubble = true;

      selectShape(id);
    },
    [id]
  );

  const handleDrag = useCallback(
    (event: KonvaEventObject<DragEvent>) => {
      moveShape(id, event);
    },
    [id]
  );

  const handleTransform = useCallback(
    (event: KonvaEventObject<Event>) => {
      if (shapeRef.current) {
        transformCircleShape(shapeRef.current, id);
      }
    },
    [id]
  );

  return (
    <>
      <KonvaCircle
        onClick={handleSelect}
        onTap={handleSelect}
        onDragStart={handleSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={handleDrag}
        onTransformEnd={handleTransform}
      />
      {isSelected && (
        <KonvaTransformer
          anchorSize={5}
          borderDash={[6, 2]}
          ref={transformerRef}
          rotateEnabled={false}
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-right",
            "bottom-left",
          ]}
          boundBoxFunc={boundBoxCallbackForCircle}
        />
      )}
    </>
  );
}
