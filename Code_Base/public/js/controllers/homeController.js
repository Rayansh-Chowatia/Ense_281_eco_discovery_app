import { homePageData } from "../models/homeModel.js";
import { renderHomePage } from "../views/homeView.js";

export function initHomePage() {
  renderHomePage(homePageData);
}