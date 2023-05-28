import { Stage } from "konva/lib/Stage";

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

  //const newScale = Math.max(0.05, oldScale * scaleBy);
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
  const {stage} = props;

  return (
    <div className="zoom-container">
      <button
        onClick={() => {
          zoomStage(stage, 0.2);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          zoomStage(stage, -0.2);
        }}
      >
        -
      </button>
    </div>
  );
}

export default ZoomPanel;