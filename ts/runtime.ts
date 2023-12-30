import { AppRuntime, getAppById } from "$ts/apps";
import { AppInfoIcon } from "$ts/images/apps";
import { sendNotification } from "$ts/notif";
import { Process } from "$ts/process";
import { Store } from "$ts/writable";
import type { App } from "$types/app";
import { ReadableStore } from "$types/writable";

export class AppInfoRuntime extends AppRuntime {
  public _targetApp: ReadableStore<App> = Store<App>();
  public _targetId: ReadableStore<string> = Store<string>();

  constructor(app: App, mutator: ReadableStore<App>, process: Process) {
    super(app, mutator, process);

    function stop() {
      process.handler.kill(process.pid);

      sendNotification({
        title: "Can't open App Info",
        message: "App Info was opened without a valid App ID to pull the information from.",
        image: AppInfoIcon,
        timeout: 6000,
      })
    }

    const arg = process.args[0] as string;

    if (!arg || typeof arg !== "string") {
      stop();

      return;
    }

    const targetApp = getAppById(arg);

    if (!targetApp) {
      stop();

      return;
    }

    this._targetId.set(arg)
    this._targetApp.set(targetApp);
  }
}