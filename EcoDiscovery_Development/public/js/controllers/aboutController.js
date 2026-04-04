import { aboutPageData } from "../models/aboutModel.js";
import { renderAboutPage } from "../views/aboutView.js";

export function initAboutPage() {
  renderAboutPage(aboutPageData);
}
