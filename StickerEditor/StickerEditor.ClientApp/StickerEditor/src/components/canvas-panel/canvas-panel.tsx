import Konva from 'konva';
import ZoomPanel from '../zoom-panel/zoom-panel';
import { Stage as KonvaStage, Layer, Rect as KonvaRect } from 'react-konva';
import { Fragment, useEffect, useState } from 'react';
import { Stage } from 'konva/lib/Stage';
import { KonvaEventObject } from 'konva/lib/Node';
import { CANVAS_NAME, MouseKeys } from '../../common/constants';
import { getCursorPosRelativeToStageAndScale } from '../../common/utils/konva';

function CanvasPanel() {
  const [stage, setStage] = useState<Stage>();

  const handleStage = (node: Stage) => setStage(node)

  const [selectionRectangle, setSelectionRectangle] = useState(
    new Konva.Rect({
      fill: 'rgba(0,0,255,0.5)',
      visible: false,
    }));

  const [transformer, setTransformer] = useState(new Konva.Transformer());

  const moveAroundStage = (key: MouseKeys) => (event: KonvaEventObject<MouseEvent>): void => {
    event.cancelBubble = true;
    const isLeft = event.evt.button === key;

    stage!.draggable(isLeft);
  }

  let x1: number = 0;
  let y1: number = 0;
  let x2: number = 0;
  let y2: number = 0;

  Konva.dragButtons = [0, 2];

  const startSelection = (e: KonvaEventObject<MouseEvent>) => {
    if (!stage || e.evt.button !== MouseKeys.Left) {
      return;
    }

    if (e.target !== stage && !e.target.hasName(CANVAS_NAME)) {
      return;
    }

    e.evt.preventDefault();

    const positionWithScale = getCursorPosRelativeToStageAndScale(stage);

    if (!positionWithScale) {
      return;
    }

    x1 = positionWithScale.x;
    y1 = positionWithScale.y;

    setSelectionRectangle((prev) => {
      prev.visible(true);
      prev.width(0);
      prev.height(0);
      return prev;
    });
  }

  const selection = (e: KonvaEventObject<MouseEvent>) => {
    if (!selectionRectangle.visible() || !stage) {
      return;
    }
    e.evt.preventDefault();

    const positionWithScale = getCursorPosRelativeToStageAndScale(stage);
    if (!positionWithScale) {
      return;
    }

    x2 = positionWithScale.x;
    y2 = positionWithScale.y;

    setSelectionRectangle(prev =>
      prev.setAttrs({
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x2 - x1),
        height: Math.abs(y2 - y1),
      }));
  }

  const closeSelection = (e: KonvaEventObject<MouseEvent>) => {
    if (!stage || !selectionRectangle.visible()) {
      return;
    }
    e.evt.preventDefault();

    setTimeout(() => {
      setSelectionRectangle(prev => prev.visible(false));
    });

    const shapes = stage.find('.rect');
    const box = selectionRectangle.getClientRect();
    const selected = shapes.filter((shape) =>
      Konva.Util.haveIntersection(box, shape.getClientRect())
    );

    setTransformer(prev => prev.nodes(selected));
  }

  const handleSelection = (e: KonvaEventObject<MouseEvent>): void => {
    if (selectionRectangle.visible()) {
      return;
    }

    if (e.target === stage) {
      setTransformer(prev => prev.nodes([]));
      return;
    }

    if (!e.target.hasName('rect')) {
      return;
    }

    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = transformer.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {
      setTransformer(prev => prev.nodes([e.target]));
    } else if (metaPressed && isSelected) {

      const nodes = transformer.nodes().slice();
      nodes.splice(nodes.indexOf(e.target), 1);
      setTransformer(prev => prev.nodes(nodes));
    } else if (metaPressed && !isSelected) {
      const nodes = transformer.nodes().concat([e.target]);
      setTransformer(prev => prev.nodes(nodes));
    }
  }

  useEffect(() => {
    if (!stage) {
      return;
    }

    const layer = new Konva.Layer();

    setStage(stage.add(layer));

    const rect1 = new Konva.Rect({
      x: 300,
      y: 400,
      width: 100,
      height: 90,
      fill: 'red',
      name: 'rect',
      draggable: true,
    });

    const rect2 = new Konva.Rect({
      x: 200,
      y: 200,
      width: 150,
      height: 90,
      fill: 'green',
      name: 'rect',
      draggable: true,
    });
    layer.add(rect1);
    layer.add(rect2);
    layer.add(transformer);

    const rotater = transformer.findOne('.rotater');
    rotater.on('mouseenter', () => {
      stage.content.style.cursor = 'alias';
    });

    rotater.on('mouseleave', () => {
      stage.content.style.cursor = '';
    });

    setTransformer(prev => prev.nodes([rect1, rect2]));

    layer.add(selectionRectangle);

  }, [selectionRectangle, stage, transformer]);

  return (
    <Fragment>
      <KonvaStage
        ref={handleStage}
        className="canvas-container"
        width={window.innerWidth}
        height={window.innerHeight}
        draggable={true}
        onContextMenu={e => e.evt.preventDefault()}
        onMouseDown={(e) => {
          moveAroundStage(MouseKeys.Right)(e)
          startSelection(e);
        }}
        onMouseUp={closeSelection}
        onMouseMove={selection}
        onClick={handleSelection}
      >
        <Layer>
          <KonvaRect
            x={50}
            y={50}
            width={700}
            height={700}
            stroke={'black'}
            fill={'lightgrey'}
            name={CANVAS_NAME}
          />
        </Layer>
      </KonvaStage>
      {stage &&
        <ZoomPanel stage={stage} />}
    </Fragment>
  );
}

export default CanvasPanel;
