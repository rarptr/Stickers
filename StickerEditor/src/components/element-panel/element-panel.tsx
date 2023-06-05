import { ReactElement } from 'react';
import { KEY_OF_DRAG_ELEMENT, SHAPES } from '../../constants';


const handleDragStart = (event: React.DragEvent<HTMLDivElement>): void => {
  const type: string | undefined = event.currentTarget.dataset.shape;

  if (type) {
    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;

    const clientWidth = event.currentTarget.clientWidth;
    const clientHeight = event.currentTarget.clientHeight;

    const dragPayload = JSON.stringify({
      type,
      offsetX,
      offsetY,
      clientWidth,
      clientHeight,
    });

    // TODO: nativeEvent
    event.dataTransfer.setData(KEY_OF_DRAG_ELEMENT, dragPayload);
  }
};

function ElementPanel(): ReactElement {

  return (
    <aside className="element-panel">
      <h2>Shapes</h2>
      <div className="shapes">
        <div className="shape-container">
          <div
            className="shape line"
            data-shape={SHAPES.LINE}
            draggable
            onDragStart={handleDragStart}
          />
        </div>
        <div
          className="shape rectangle"
          data-shape={SHAPES.RECTANGLE}
          draggable
          onDragStart={handleDragStart}
        />
        <div
          className="shape circle"
          data-shape={SHAPES.CIRCLE}
          draggable
          onDragStart={handleDragStart}
        />
      </div>
    </aside>
  );
}

export default ElementPanel;