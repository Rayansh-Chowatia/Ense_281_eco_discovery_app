import { gamePageData } from "../models/gameModel.js";
import { renderGamePage, startGameTimer } from "../views/gameView.js";

export function initGamePage() {
  renderGamePage(gamePageData);
  startGameTimer(300); // 5-minute countdown
}
