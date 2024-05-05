import queryString from 'query-string'
import {klona} from 'klona/full'
import type {ElMessageBoxOptions} from 'element-plus'
import {ElLoading, ElMessage, ElMessageBox} from 'element-plus'

export const STORAGE_TOKEN = 'TOKEN'
export const STORAGE_USERNAME = 'USERNAME'

export function $isLogin() {
  return !!$getToken() && !!$getUsername()
}
export function $getToken() {
  return window.localStorage.getItem(STORAGE_TOKEN) ?? undefined
}
function $setToken(token: string) {
  window.localStorage.setItem(STORAGE_TOKEN, token)
}
function $clearToken() {
  window.localStorage.removeItem(STORAGE_TOKEN)
}
export function $getUsername() {
  return window.localStorage.getItem(STORAGE_USERNAME) ?? undefined
}
function $setUsername(username: string) {
  window.localStorage.setItem(STORAGE_USERNAME, username)
}
function $clearUsername() {
  window.localStorage.removeItem(STORAGE_USERNAME)
}

export function $login({token, username}: {token: string; username: string}) {
  $setToken(token)
  $setUsername(username)
}
export function $logout() {
  $clearToken()
  $clearUsername()
}

export const $stringify = queryString.stringify
export const $clone = klona

// Element Plus

let loadingInstance: ReturnType<typeof ElLoading.service>
export const $loading = {
  show: (text = 'Loading...') => {
    loadingInstance = ElLoading.service({
      body: true,
      // target: '#app',
      lock: true,
      text,
    })
  },
  hide: () => {
    loadingInstance.close()
  },
}

/**
 * `element-plus` 的 ElMessage
 */
export const $toast = {
  success: (message: string) => {
    ElMessage.success({message, zIndex: 1000})
  },
  error: (message: string) => {
    ElMessage.error({message, zIndex: 1000})
  },
  warning: (message: string) => {
    ElMessage.warning({message, zIndex: 1000})
  },
}

/**
 * `element-plus` 的 ElMessageBox
 */
export async function $confirm(
  message: string,
  options?: ElMessageBoxOptions,
): Promise<boolean> {
  return new Promise(resolve => {
    ElMessageBox.confirm(message, '确认', {
      confirmButtonText: options?.confirmButtonText ?? '确定',
      cancelButtonText: options?.cancelButtonText ?? '取消',
      type: options?.type ?? 'warning',
    })
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        resolve(false)
      })
  })
}

/**
 * `element-plus` 的 ElMessageBox
 */
export async function $alert(
  message: string | VNode | (() => VNode),
  title?: string,
  options: ElMessageBoxOptions = {},
) {
  return ElMessageBox.alert(message, title, {
    confirmButtonText: '确定',
    ...options,
  })
}
