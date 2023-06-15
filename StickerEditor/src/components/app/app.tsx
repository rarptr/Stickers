import Editor from '../../pages/editor/editor';

function App(): JSX.Element {

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
