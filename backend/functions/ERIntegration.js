import {
  checkNicknameExpirationDate,
  getLastGame,
  getUserNum,
} from "../services/ERIntegration";
import { successMessage } from "../utils";

export const checkNickname = async (event) => {
  const { nickname } = event.queryStringParameters;
  try {
    const userNum = await getUserNum(nickname);
    if (userNum === null) {
      return successMessage({ message: "Nickname is available" });
    }
    const lastGame = await getLastGame(userNum);
    if (lastGame === null) {
      return successMessage({ message: "Nickname could be available" });
    }
    const { startDtm, accountLevel } = lastGame;
    const expirationDate = checkNicknameExpirationDate(accountLevel, startDtm);
    return successMessage({ expirationDate });
  } catch (err) {
    console.log(err);
    return { statusCode: 500, message: err.message };
  }
};
