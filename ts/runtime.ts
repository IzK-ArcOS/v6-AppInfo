import { AppRuntime, getAppById } from "$ts/apps";
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