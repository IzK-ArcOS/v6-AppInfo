import { AppRuntime, getAppById } from "$ts/apps";
import { Log } from "$ts/console";
import { AppInfoIcon } from "$ts/images/apps";
import { sendNotification } from "$ts/notif";
import { Process } from "$ts/process";
import { createErrorDialog } from "$ts/process/error";
import { Store } from "$ts/writable";
import type { App } from "$types/app";
import { LogLevel } from "$types/console";
import { ReadableStore } from "$types/writable";
import LoadCondition from "../Components/LoadCondition.svelte";
import SingleInstance from "../Components/SingleInstance.svelte";

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

      this.Log("Not opening AppInfo without an ID to pull data from", "constructor", LogLevel.error);

      return;
    }

    const targetApp = getAppById(arg);

    if (!targetApp) {
      stop();

      this.Log("Not opening AppInfo without a valid app-ID to pull data from", "constructor", LogLevel.error);

      return;
    }

    this._targetId.set(arg)
    this._targetApp.set(targetApp);
  }

  public loadConditionDialog() {
    createErrorDialog({
      title: "Load Condition",
      component: LoadCondition,
      buttons: [{ caption: "Understood", action() { }, suggested: true }],
      image: AppInfoIcon
    }, this.process.pid, true)
  }

  public singleInstanceDialog() {
    createErrorDialog({
      title: "Single Instance",
      component: SingleInstance,
      buttons: [{ caption: "Understood", action() { }, suggested: true }],
      image: AppInfoIcon
    }, this.process.pid, true)
  }
}