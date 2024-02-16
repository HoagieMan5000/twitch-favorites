import BackgroundUpdater from "./BackgroundUpdater";
import CachedDataProvider from "../../shared/util/CachedDataProvider";
import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';
import { initStreamInfoProvider } from "./StreamInfoProvider";

reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');

export default class Background {
  dataUpdater = new BackgroundUpdater();

  public init() {
    const self = this;

    this.dataUpdater.update();
    initStreamInfoProvider();
    setInterval(() => this.dataUpdater.update(), 30000);
  }
}
new Background().init();

