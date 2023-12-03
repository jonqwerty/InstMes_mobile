/* eslint-disable indent */
const handleErrorMiddleware = () => next =>
  function (action) {
    if (action?.error) {
      const {name} = action.error;
      if (name === 'FieldErrors') {
        return next(action);
      }
    }

    return action ? next(action) : null;
  };

export {handleErrorMiddleware};
