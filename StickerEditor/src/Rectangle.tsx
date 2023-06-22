import React, { useRef, useEffect, useCallback } from "react";
import { Rect as KonvaRectangle, Transformer as KonvaTransformer } from "react-konva";

import { LIMITS } from "./constants";
import { selectShape, transformRectangleShape, moveShape } from "./state";
import { SelectedShape } from "./types";
import { Box } from "konva/lib/shapes/Transformer";
import { Rect } from "konva/lib/shapes/Rect";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";


const boundBoxCallbackForRectangle = (oldBox: Box, newBox: Box): Box => {
  if (
    newBox.width < LIMITS.RECT.MIN ||
    newBox.height < LIMITS.RECT.MIN ||
    newBox.width > LIMITS.RECT.MAX ||
    newBox.height > LIMITS.RECT.MAX
  ) {
    return oldBox;
  }
  return newBox;
};

type RectangleProps = {
  shape: SelectedShape;
  isSelected: boolean;
}

export function Rectangle({shape, isSelected}: RectangleProps) {
  const { id, type, ...shapeProps } = shape;
  
  const shapeRef = useRef<Rect>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (isSelected && shapeRef.current && transformerRef.current) {
     transformerRef.current.nodes([shapeRef.current]);
     
     // TODO: рассмотреть
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
      transformRectangleShape(shapeRef.current, id);
    },
    [id]
  );

  return (
    <>
      <KonvaRectangle
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
          boundBoxFunc={boundBoxCallbackForRectangle}
        />
      )}
    </>
  );
}
