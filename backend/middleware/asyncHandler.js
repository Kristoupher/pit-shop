//Intercepte les erreurs asynchrones et les transmet à next()
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;