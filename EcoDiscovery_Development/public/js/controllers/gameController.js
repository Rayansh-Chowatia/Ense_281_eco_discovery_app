import { gamePageData } from "../models/gameModel.js";
import { renderGamePage } from "../views/gameView.js";

export function initGamePage() {
  renderGamePage(gamePageData);
}
