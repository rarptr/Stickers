import Konva from "konva";
import { Rect } from "konva/lib/shapes/Rect";
import { useCallback, useEffect, useState } from "react";
import { Group, Rect as KonvaRect } from "react-konva";
import { getCursorPosRelative } from "../../common/utils/konva";
import { Workspace } from "../../types/editor";

type SelectToolProps = {
  isMouseDown: boolean;
  workspace: Workspace;
  pointerPosition: Konva.Vector2d;
}

function SelectTool(props: SelectToolProps) {
  const { isMouseDown, workspace, pointerPosition } = props;

  const [shape, setShape] = useState<Konva.Rect>();
  const [startPos, setStartPos] = useState<Konva.Vector2d>();
  const [isSelecting, setIsSelecting] = useState<boolean>(false);

  const handleShape = useCallback((node: Konva.Rect) => {
    setShape(node)
  }, []);


  useEffect(() => {
    // Если мышь нажата, но выделения ещё нет
    if (isMouseDown && !isSelecting) {
      setIsSelecting(true)
      setStartPos(getCursorPosRelative(workspace, pointerPosition)!)
    }
  }, [isMouseDown, isSelecting, pointerPosition, workspace])

  return (
    <Group>
      <KonvaRect ref={handleShape} id="selectRect" fill="rgba(0,128,255,0.3)" />
    </Group>
  );
}