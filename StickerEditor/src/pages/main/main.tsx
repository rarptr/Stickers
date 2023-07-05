import { Link } from 'react-router-dom';
import { AppRoute } from "../../common/constants";
import { JSX } from 'react/jsx-runtime';

function Main(): JSX.Element {
  return (
    <div className="container">
      <div className="row">
        <div className="card">
          <img src="image-3.jpg" className="card-img-top" alt="..." />
          <div className="card-body">
            <h1 className="card-title">Editor</h1>
            <p className="card-text">Описание...</p>
            <Link to={AppRoute.Editor} className="btn btn-primary">
              Перейти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;