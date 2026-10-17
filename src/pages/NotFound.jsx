import { Link } from "react-router-dom";
import useApp from "../context/useApp";

export default function NotFound() {
  const { t } = useApp();

  return (
    <div className="section">
      <div className="container-x py-16 text-center">
        <p className="font-display text-7xl font-bold text-clay-600/30 dark:text-clay-300/25">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold">{t.common.notFound}</h1>
        <Link to="/" className="btn-primary mt-8">
          {t.common.backHome}
        </Link>
      </div>
    </div>
  );
}
