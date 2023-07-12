import { Stage } from "konva/lib/Stage";
import { Vector2d } from "konva/lib/types";

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