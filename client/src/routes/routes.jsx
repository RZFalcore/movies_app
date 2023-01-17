import HomePage from "../pages/HomePage";
import PersonDetail from "../pages/PersonDetailPage";
import FavoriteList from "../pages/FavoriteListPage";
import MediaDetails from "../pages/MediaDetailsPage";
import MediaList from "../pages/MediaListPage";
import MediaSearch from "../pages/MediaSearchPage";
import PasswordUpdate from "../pages/PasswordUpdatePage";
import ReviewList from "../pages/ReviewListPage";
import ProtectedPage from "../components/common/ProtectedPage";

export const routesGen = {
  home: "/",
  mediaList: (type) => `${type}`,
  mediaDetail: (type, id) => `/${type}/${id}`,
  mediaSearch: "/search",
  person: (id) => `/person/${id}`,
  favoritesList: "/favorites",
  reviewList: "/reviews",
  passwordUpdate: "/password-update",
};

const routes = [
  {
    index: true,
    element: <HomePage />,
    state: "home",
  },
  {
    path: "/person/:personId",
    element: <PersonDetail />,
    state: "person.detail",
  },
  {
    path: "/search",
    element: <MediaSearch />,
    state: "search",
  },
  {
    path: "/password-update",
    element: (
      <ProtectedPage>
        <PasswordUpdate />
      </ProtectedPage>
    ),
    state: "password.update",
  },
  {
    path: "/favorites",
    element: (
      <ProtectedPage>
        <FavoriteList />
      </ProtectedPage>
    ),
    state: "favorites",
  },
  {
    path: "/reviews",
    element: (
      <ProtectedPage>
        <ReviewList />
      </ProtectedPage>
    ),
    state: "reviews",
  },
  {
    path: "/mediaType",
    element: <MediaList />,
  },
  {
    path: "/mediaType/:mediaId",
    element: <MediaDetails />,
  },
];

export default routes;
