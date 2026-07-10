/* Validates and REPLACES req.body/query/params with the parsed, typed result,
   stripping any unknown fields so handlers only see whitelisted data. */
export const validate = (schemas) => (req, _res, next) => {
  try {
    if (schemas.body) req.body = schemas.body.parse(req.body);
    if (schemas.query) req.query = schemas.query.parse(req.query);
    if (schemas.params) req.params = schemas.params.parse(req.params);
    next();
  } catch (err) {
    next(err);
  }
};
