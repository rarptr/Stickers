import { ReactElement, useState } from 'react';
import { KEY_OF_DRAG_ELEMENT, SHAPES } from '../../common/constants';
import { Stage } from 'konva/lib/Stage';


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

    event.dataTransfer.setData(KEY_OF_DRAG_ELEMENT, dragPayload);
  }
};



type ElementPanelProps = {
  action: () => void;
}

function ElementPanel(props: ElementPanelProps): ReactElement {
  const { action } = props;

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
        {/* <div>
          <button
            className="shape"
            onClick={action}
          >
            КНОПКА ДЛЯ ТЕСТОВ
          </button>
        </div > */}
      </div>
    </aside>
  );
}

export default ElementPanel;