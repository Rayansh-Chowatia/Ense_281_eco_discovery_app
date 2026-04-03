import { videosPageData } from "../models/videosModel.js";
import { renderVideosPage } from "../views/videosView.js";

export function initVideosPage() {
  renderVideosPage(videosPageData);
}
