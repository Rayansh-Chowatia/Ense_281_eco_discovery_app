import { sourcesPageData } from "../models/sourcesModel.js";
import { renderSourcesPage } from "../views/sourcesView.js";

export function initSourcesPage() {
  renderSourcesPage(sourcesPageData);
}
