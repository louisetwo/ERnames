import {
  checkNicknameExpirationDate,
  getLastGame,
  getUserNum,
} from "../services/ERIntegration";
import { failureMessage, successMessage } from "../utils";

export const checkNickname = async (event) => {
  const { nickname } = event.queryStringParameters;
  try {
    const userNum = await getUserNum(nickname);
    if (userNum === null) {
      return successMessage({
        message: "Nickname is available",
        status: "available",
      });
    }

    const lastGame = await getLastGame(userNum);
    if (lastGame === null) {
      return successMessage({
        message: "Nickname could be available",
        status: "unsure",
      });
    }

    const { startDtm, accountLevel } = lastGame;
    const expirationDate = checkNicknameExpirationDate(accountLevel, startDtm);
    return successMessage({
      message: `Nickname will be available on ${expirationDate}`,
      status: "unavailable",
      expirationDate,
    });
  } catch (err) {
    console.log(err);
    return failureMessage(err.message, 500);
  }
};
