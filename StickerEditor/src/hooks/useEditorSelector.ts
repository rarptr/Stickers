import { TypedUseSelectorHook, useSelector } from "react-redux";
import { EditorState } from "../types/editor";
import { RootState } from "../store";

// TODO: переписать на RootState
export const useEditorSelector: TypedUseSelectorHook<RootState> = useSelector;