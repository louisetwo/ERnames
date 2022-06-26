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

export const getTomorrowDate = () => {
  return new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
};

export const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};
