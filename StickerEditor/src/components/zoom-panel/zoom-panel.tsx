import { Stage } from "konva/lib/Stage";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addTodo, changeScale } from "../../store/editorSlice";
import Konva from "konva";
import { useEditorSelector } from "../../hooks/useEditorSelector";

const Scale = {
  scale: 0.15,
  max: 2,
  min: 0.1,
};


function zoomStage(stage: Stage, scaleBy: number) {
  const oldScale = stage.scaleX();

  const pos = {
    x: stage.width() / 2,
    y: stage.height() / 2,
  };

  const mousePointTo = {
    x: pos.x / oldScale - stage.x() / oldScale,
    y: pos.y / oldScale - stage.y() / oldScale,
  };

  const newScale = oldScale + scaleBy;

  const newPos = {
    x: -(mousePointTo.x - pos.x / newScale) * newScale,
    y: -(mousePointTo.y - pos.y / newScale) * newScale,
  };

  stage.to({
    x: newPos.x,
    y: newPos.y,
    scaleX: newScale,
    scaleY: newScale,
    duration: 0,
  });
}

type ZoomPanelProps = {
  stage: Stage;
}

function ZoomPanel(props: ZoomPanelProps) {
  const { stage } = props;
  const [zoom, setZoom] = useState(useEditorSelector(state => state.editor.scale));
  const [isMax, setIsMax] = useState(false);
  const [isMin, setIsMin] = useState(false);


  const dispatch = useAppDispatch()
  const onChangeScale = (scale: Konva.Vector2d) => dispatch(changeScale({ scale: scale.x }))

  const handleZoomInClick = () => {
    if (!isMax) {
      zoomStage(stage, Scale.scale);
      onChangeScale(stage.scale()!);

      const newScale = stage.scaleX() + Scale.scale;
      if (newScale >= Scale.max) {
        setIsMax(true);
      }
      if (newScale > Scale.min) {
        setIsMin(false);
      }
    }
  };

  const handleZoomOutClick = () => {
    if (!isMin) {
      zoomStage(stage, -Scale.scale);
      onChangeScale(stage.scale()!);

      const newScale = stage.scaleX() - Scale.scale;
      if (newScale <= Scale.min) {
        setIsMin(true);
      }
      if (newScale < Scale.max) {
        setIsMax(false);
      }
    }
  };


  return (
    <div className="zoom-container">
      <button
        onClick={handleZoomInClick}
        disabled={isMax}
      >
        +
      </button>
      <button
        onClick={handleZoomOutClick}
        disabled={isMin}
      >
        -
      </button>
    </div>
  );
}

export default ZoomPanel;