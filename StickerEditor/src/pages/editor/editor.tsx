import ElementPanel from '../../components/element-panel/element-panel';
import CanvasPanel from '../../components/canvas-panel/canvas-panel';

function Editor() {
  return (
    <div className="base-container">
      <ElementPanel />
      <CanvasPanel height={500} width={500} />
    </div>
  );
}

export default Editor;