import React, { useCallback } from "react";
import { useShapes, updateAttribute } from "./state";
import { Shape, State } from "./types";


const shapeSelector = (state: State): Shape | null =>
  state.selected != null ? state.shapes[state.selected] : null;

export function PropertiesPanel(): JSX.Element {
  // TODO: https://github.com/halka-org/state
  const selectedShape = useShapes<Shape | null>(shapeSelector);

  const updateAttr = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const attr = event.target.name as keyof Shape;
    const value = event.target.value;

    updateAttribute(attr, value);
  }, []);

  return (
    <aside className="panel">
      <h2>Properties</h2>
      <div className="properties">
        {selectedShape
          ? (<>
            <div className="key">
              Type <span className="value">{selectedShape.type}</span>
            </div>

            <div className="key">
              Stroke{" "}
              <input
                className="value"
                name="stroke"
                type="color"
                value={selectedShape.stroke}
                onChange={updateAttr}
              />
            </div>

            <div className="key">
              Fill{" "}
              <input
                className="value"
                name="fill"
                type="color"
                value={selectedShape.fill}
                onChange={updateAttr}
              />
            </div>
          </>)
          : (<div className="no-data">Nothing is selected</div>)}
      </div>
    </aside>
  );
}