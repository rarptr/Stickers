import Konva from 'konva';
import { Stage } from 'konva/lib/Stage';
import { Fragment, useEffect, useRef, useState } from 'react';
import ZoomPanel from '../zoom-panel/zoom-panel';
import { Stage as KonvaStage } from 'react-konva';

type CanvasPanelProps = {
  width: number;
  height: number;
  number: number;
}

function CanvasPanel(props: CanvasPanelProps) {
  const { width, height, number } = props;

  const container = useRef<HTMLDivElement>(null);

  const [stage, setStage] = useState<Stage>();

  useEffect(() => {

    const stage = new Konva.Stage({
      container: container.current!,
      width: width,
      height: height,
      draggable: true,
    });

    setStage(stage);

    const layer = new Konva.Layer();
    stage.add(layer);

    function generateNode() {
      return new Konva.Circle({
        x: width * Math.random(),
        y: height * Math.random(),
        radius: 50,
        fill: 'red',
        stroke: 'black',
      });
    }

    for (let i = 0; i < number; i++) {
      layer.add(generateNode());
    }
    
  }, [width, height, number]);

  return (
    <Fragment>
      <div className="canvas-container" ref={container}></div>
      <ZoomPanel stage={stage!} />
    </Fragment>
  );
}

export default CanvasPanel;