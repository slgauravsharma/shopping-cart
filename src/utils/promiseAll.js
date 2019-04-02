const promiseAll = async (firstParam, ...rest) => {
  const response = [];
  const params =
    [...rest].length === 0
      ? typeof firstParam === "string"
        ? [firstParam]
        : firstParam
      : [firstParam, ...rest];
  for (let i in params) {
    params[i].catch(e => e);
  }
  const promiseFuncs = params.map(p => () => p);
  for (let i in promiseFuncs) {
    const promiseFunc = promiseFuncs[i];
    response.push(await promiseFunc());
  }
  return response;
};

export default promiseAll;
