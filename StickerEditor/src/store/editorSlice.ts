import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { baseState } from "./constants";
import { Workspace } from "../types/editor";

const editorSlice = createSlice({
  name: 'editor',
  initialState: baseState,
  reducers: {
    // TODO: clear
    addTodo(state) {
      state.x = 120;
      state.y = 320;

    },
    changeWorkspace(state, action: PayloadAction<Workspace>) {
      state.workspace = action.payload;
    },
    changeScale(state, action: PayloadAction<{ scale: number }>) {
      state.scale = action.payload.scale;
    },
    moveShape(state, action: PayloadAction<{ id: number, x: number, y: number }>) {
      const shape = state.shapes.find(shape => shape.id === action.payload.id);
      if (shape) {
        shape.x = action.payload.x;
        shape.y = action.payload.y;
      }
    },
    createRectangle(state, action: PayloadAction<{ x: number, y: number }>) {
      state.shapes.push({
        id: new Date().getTime(),
        x: action.payload.x,
        y: action.payload.y,
        width: 30,
        height: 30,
      });
    }
  },
});

export const { addTodo, changeWorkspace, changeScale, moveShape, createRectangle } = editorSlice.actions;

export default editorSlice.reducer;