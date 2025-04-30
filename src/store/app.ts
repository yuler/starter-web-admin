import Cookies from 'js-cookie'
import {defineStore} from 'pinia'
import type {AppDevice} from '../types'

export const useAppStore = defineStore('app', () => {
  const device = ref<AppDevice>('desktop')
  function setDevice(value: AppDevice) {
    device.value = value
  }

  const asideCollapsed = ref<boolean>(!!Cookies.get('APP_ASIDE_COLLAPSED'))
  function asideCollapse() {
    Cookies.set('APP_ASIDE_COLLAPSED', '1')
    asideCollapsed.value = false
  }
  function asideToggle() {
    asideCollapsed.value = !asideCollapsed.value
    if (asideCollapsed.value) {
      Cookies.set('APP_ASIDE_COLLAPSED', '1')
    } else {
      Cookies.remove('APP_ASIDE_COLLAPSED')
    }
  }

  const drawerDisplay = ref<boolean>(false)
  function drawerCollapse() {
    drawerDisplay.value = false
  }
  function drawerToggle() {
    drawerDisplay.value = !drawerDisplay.value
  }

  return {
    device,
    asideCollapsed,
    asideCollapse,
    asideToggle,
    setDevice,
    drawerDisplay,
    drawerCollapse,
    drawerToggle,
  }
})
