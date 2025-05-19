const extractPathnameSegments = () => {
  const splitPath = location.hash.split('/');

  return {
    resource: splitPath[1] || null,
    id: splitPath[2] || null,
  };
};

const constructRouteFromSegments = (pathSegments) => {
  let pathname = '';
  if (pathSegments.resource) {
    pathname = pathname.concat(`/${pathSegments.resource}`);
  }
  if (pathSegments.id) {
    pathname = pathname.concat('/:id');
  }
  return pathname || '/';
};

const getActivePathname = () => {
  return location.hash.replace('#', '') || '/';
};

const getActiveRoute = () => {
  const pathname = getActivePathname();
  const pathSegments = extractPathnameSegments(pathname);
  return constructRouteFromSegments(pathSegments);
};

const parseActivePathname = () => {
  const pathname = getActivePathname();
  return extractPathnameSegments(pathname);
};

export { getActiveRoute, parseActivePathname };
