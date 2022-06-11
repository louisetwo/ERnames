import { instance } from "../client/axiosInstance";

export const checkNicknameExpirationDate = (accountLevel, lastGameDate) => {
  const startDate = new Date(lastGameDate);
  if (accountLevel < 10) {
    return addDays(startDate, 90);
  }
  if (accountLevel < 20) {
    return addDays(startDate, 180);
  }
  return addDays(startDate, 270);
};

export const getUserNum = async (nickname) => {
  const result = await instance.get("user/nickname", {
    params: { query: nickname },
  });
  if (result.data.code === 404) {
    return null;
  }

  const { userNum } = result.data.user;
  return userNum;
};

export const getLastGame = async (userNum) => {
  const result = await instance.get(`user/games/${userNum}`);
  if (result.data.code === 404) {
    return null;
  }
  const games = result.data.userGames;
  const lastGame = games[0];
  return lastGame;
};

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
