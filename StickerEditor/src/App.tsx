import { Canvas } from "./Canvas";
import { PropertiesPanel } from "./PropertiesPanel";
import { Palette } from "./Palette";

function App() {
  return (
    <div className="app">
      <Palette />
      <Canvas />
      <PropertiesPanel />
    </div>
  );
}

export default App;
