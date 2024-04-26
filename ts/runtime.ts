import { AppRuntime, getAppById } from "$ts/apps";
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

    // Stops AppInfo if the argument is invalid
    function stop(arg?: string) {
      process.handler.kill(process.pid, true);

      const suffix = arg ? ` App "${arg}" could not be found.` : "";

      sendNotification({
        // Let the user know
        title: "Can't open App Info",
        message: `App Info was opened without a valid App ID to pull the information from.${suffix}`,
        image: AppInfoIcon,
        /* timeout: 3000, */
      });
    }

    const arg = process.args[0] as string;

    if (!arg || typeof arg !== "string") {
      stop();

      this.Log(
        "Not opening AppInfo without an ID to pull data from",
        "constructor",
        LogLevel.error
      );

      return;
    }

    const targetApp = getAppById(arg); // Get the specified application

    if (!targetApp) {
      stop(arg);

      this.Log(
        "Not opening AppInfo without a valid app-ID to pull data from.",
        "constructor",
        LogLevel.error
      );

      return;
    }

    // Set the window title according to the specified app
    this.setWindowTitle(`Information about ${targetApp.metadata.name}`);

    // Save the specified app ID and the app data to writables to use in the Svelte
    this._targetId.set(arg);
    this._targetApp.set(targetApp);
  }

  // Displays information to the user about `App.loadCondition`
  public loadConditionDialog() {
    createErrorDialog(
      {
        title: "Load Condition",
        component: LoadCondition,
        buttons: [{ caption: "Understood", action() {}, suggested: true }],
        image: AppInfoIcon,
        sound: "arcos.dialog.info",
      },
      this.process.pid,
      true
    );
  }

  // Displays information to the user about `App.singleInstance`
  public singleInstanceDialog() {
    createErrorDialog(
      {
        title: "Single Instance",
        component: SingleInstance,
        buttons: [{ caption: "Understood", action() {}, suggested: true }],
        image: AppInfoIcon,
        sound: "arcos.dialog.info",
      },
      this.process.pid,
      true
    );
  }
}
