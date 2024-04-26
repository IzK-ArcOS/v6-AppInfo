import { AppInfoIcon } from "$ts/images/apps";
import { App } from "$types/app";
import AppSvelte from "../App.svelte";
import { AppInfoRuntime } from "./runtime";

// Application Metadata
export const AppInfo: App = {
  metadata: {
    name: "App Info",
    description: "View information about an app",
    author: "The ArcOS Team",
    version: "2.0.0",
    appGroup: "internal",
    icon: AppInfoIcon,
    hidden: true,
  },
  runtime: AppInfoRuntime,
  content: AppSvelte,
  id: "AppInfo",
  size: { w: 500, h: NaN },
  minSize: { w: 500, h: 450 },
  maxSize: { w: 500, h: 460 },
  pos: { x: 120, y: 60 },
  state: {
    minimized: false,
    maximized: false,
    headless: false,
    fullscreen: false,
    resizable: false,
  },
  controls: {
    minimize: true,
    maximize: false,
    close: true,
  },
  glass: true,
};
