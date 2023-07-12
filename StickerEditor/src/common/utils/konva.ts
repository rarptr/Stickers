import { Stage } from "konva/lib/Stage";
import { Vector2d } from "konva/lib/types";
import { Workspace } from "../../types/editor";
import Konva from "konva";

export function getCursorPosRelativeToStageAndScale(stage: Stage): Vector2d | null {
  const stagePosition = stage.getPointerPosition();
  if (!stagePosition) {
    return null;
  }

  const position: Vector2d | null = {
    x: stagePosition.x - stage.position().x,
    y: stagePosition.y - stage.position().y,
  };

  position.x /= stage.scaleX();
  position.y /= stage.scaleX();

  return position
}

export function getCursorPosRelative(workspace: Workspace, pointerPosition: Konva.Vector2d): Vector2d | null {
  if (!pointerPosition) {
    return null;
  }

  const position: Vector2d | null = {
    x: pointerPosition.x - workspace.x,
    y: pointerPosition.y - workspace.y,
  };

  position.x /= workspace.scale;
  position.y /= workspace.scale;

  return position
}