export const successMessage = (body, code = 200) => {
  return {
    statusCode: code,
    body: JSON.stringify(body),
  };
};

export const failureMessage = (body, code) => {
  return {
    statusCode: code,
    body: JSON.stringify(body),
  };
};
