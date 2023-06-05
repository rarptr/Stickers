import Konva from 'konva';
import ZoomPanel from '../zoom-panel/zoom-panel';
import { Stage } from 'konva/lib/Stage';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Circle as KonvaCircle, Stage as KonvaStage, Layer, Rect as KonvaRect } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { CANVAS_NAME, MouseKeys } from '../../constants';
import { Circle } from 'konva/lib/shapes/Circle';

type CanvasPanelProps = {
  width: number;
  height: number;
}

function CanvasPanel(props: CanvasPanelProps) {
  const { width, height } = props;

  const stageRef = useRef<Stage>(null);
  const circleRef = useRef<Circle>(null);

  Konva.dragButtons = [0, 2];

  const preventDefaultKonvaEvent = (event: KonvaEventObject<Event>): void => {
    event.evt.preventDefault();
  }

  // TODO: замыкание
  const moveAroundStage = (key: MouseKeys) => (event: KonvaEventObject<MouseEvent>): void => {
    debugger;
    event.cancelBubble = true;
    const isLeft = event.evt.button === key;

    stageRef.current!.draggable(isLeft);
  }

  const moveShape = (key: MouseKeys) => (event: KonvaEventObject<MouseEvent>): void => {
    event.cancelBubble = true;
    const isLeft = event.evt.button === key;

    circleRef.current!.draggable(isLeft);
  }

  const [selectionRectangle, setSelectionRectangle] = useState(
    new Konva.Rect({
      fill: 'rgba(0,0,255,0.5)',
      visible: false,
    }));

  const [transformer, setTransformer] = useState(new Konva.Transformer());

  let x1: number;
  let y1: number;
  let x2: number;
  let y2: number;

  // TODO: useCallback ?
  const startSelection = (e: KonvaEventObject<MouseEvent>) => {
    if (e.evt.button !== MouseKeys.Left || !stageRef.current) {
      return;
    }

    if ((e.target !== stageRef.current && !e.target.hasName(CANVAS_NAME))) {
      return;
    }

    e.evt.preventDefault();

    const position = stageRef.current.getPointerPosition();
    if (!position) {
      return;
    }

    x1 = position.x;
    y1 = position.y;
    x2 = position.x;
    y2 = position.y;

    setSelectionRectangle((prev) => {
      prev.visible(true);
      prev.width(0);
      prev.height(0);
      return prev;
    });
  }

  const selection = (e: KonvaEventObject<MouseEvent>) => {
    if (!selectionRectangle.visible() || !stageRef.current) {
      return;
    }
    e.evt.preventDefault();

    const position = stageRef.current.getPointerPosition();
    if (!position) {
      return;
    }

    x2 = position.x;
    y2 = position.y;

    setSelectionRectangle(prev =>
      prev.setAttrs({
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x2 - x1),
        height: Math.abs(y2 - y1),
      }));
  }

  const closeSelection = (e: KonvaEventObject<MouseEvent>) => {
    if (!selectionRectangle.visible()) {
      return;
    }
    e.evt.preventDefault();

    setTimeout(() => {
      setSelectionRectangle(prev => prev.visible(false));
    });

    const shapes = stageRef.current!.find('.rect');
    var box = selectionRectangle.getClientRect();
    var selected = shapes.filter((shape) =>
      Konva.Util.haveIntersection(box, shape.getClientRect())
    );

    setTransformer(prev => prev.nodes(selected));
  }

  const handleSelection = (e: KonvaEventObject<MouseEvent>): void => {
    if (selectionRectangle.visible()) {
      return;
    }

    if (e.target === stageRef.current) {
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
    const stage = stageRef.current;
    if (!stage) {
      return;
    }

    var layer = new Konva.Layer();
    stage.add(layer);

    var rect1 = new Konva.Rect({
      x: 60,
      y: 130,
      width: 100,
      height: 90,
      fill: 'red',
      name: 'rect',
      draggable: true,
    });

    var rect2 = new Konva.Rect({
      x: 210,
      y: 150,
      width: 150,
      height: 90,
      fill: 'green',
      name: 'rect',
      draggable: true,
    });

    layer.add(rect1);
    layer.add(rect2);
    layer.add(transformer);

    setTransformer(prev => prev.nodes([rect1, rect2]));

    layer.add(selectionRectangle);

  }, [stageRef, selectionRectangle, transformer]);

  return (
    <Fragment>
      <KonvaStage
        className="canvas-container"
        ref={stageRef}
        width={width}
        height={height}
        draggable={true}
        onContextMenu={preventDefaultKonvaEvent}
        onMouseDown={(e) => {
          moveAroundStage(MouseKeys.Right)(e)
          startSelection(e);
        }}
        //onMouseDown={startSelection}
        onMouseMove={selection}
        onMouseUp={closeSelection}
        onClick={handleSelection}
      >
        <Layer>
          {/* TODO: вынести в компонент "Холст" */}
          <KonvaRect
            x={100}
            y={100}
            width={300}
            height={300}
            stroke={'black'}
            fill={'lightgrey'}
            name={CANVAS_NAME}

          />
          <KonvaCircle
            ref={circleRef}
            x={width * Math.random()}
            y={height * Math.random()}
            radius={50}
            fill={'green'}
            stroke={'black'}
            draggable={true}
            onMouseDown={moveShape(MouseKeys.Left)}
          />
        </Layer>
      </KonvaStage>
      <ZoomPanel stage={stageRef.current!} />
    </Fragment>
  );
}

export default CanvasPanel;