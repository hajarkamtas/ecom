import { Link } from 'react-router-dom';

function NoMatch() {
  return (
    <div>
      <h1>Page Not Found</h1>
      <Link to="/products">Back</Link>
    </div>
  );
}

export default NoMatch;
