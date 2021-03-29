import { default as TombRaiderMenu } from './TombRaiderMenu'

declare global {
  interface Window {
    TombRaiderMenu: Function
  }
}

window.TombRaiderMenu = (containerId: string) => new TombRaiderMenu(containerId)
