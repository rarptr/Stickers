import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import Editor from '../../pages/editor/editor';
import { changeWorkspace } from '../../store/editorSlice';

function App(): JSX.Element {


  const dispatch = useAppDispatch();
  // TODO: selectors
  const onSetWorkspace = useCallback(() => dispatch(changeWorkspace({
    width: window.innerWidth,
    height: window.innerHeight,
    scale: 1,
    x: 0,
    y: 0
  })), [dispatch])

  useEffect(() => {
    window.addEventListener('resize', onSetWorkspace)
    onSetWorkspace()
    return () => {
      window.removeEventListener('resize', onSetWorkspace)
    }
  }, [onSetWorkspace])

  return (
    <Editor />
    // TODO: gh-pages
    // <BrowserRouter>
    //   <Routes>
    //     <Route
    //       path={AppRoute.Main}
    //       element={<Main />}
    //     />
    //     <Route
    //       path={AppRoute.Editor}
    //       element={<Editor />}
    //     />
    //     <Route
    //       path="*"
    //       element={<NotFoundScreen />}
    //     />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
