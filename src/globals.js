/**
 *? Use this file to register any variables or functions that should be available globally
 *? ideally you should make it available via the window object
 *? as well as the Vue prototype for access throughout the app
 *? (register globals with care, only when it makes since to be accessible app wide)
 */
import { Notify } from '@/helpers/notify.helper'
import { jwtExpiresIn, getJWTFromCookie, removeJwtCookie, setJwtCookie } from '@/helpers/jwt.helper'

import { init } from '@/helpers/http.helper'

/**
 * Working with global Components
 * Import all components from src/components/global folder
 * @returns {Array<string>} array of component names and paths
 */

export function autoImportComponents() {
    const components = require.context('@/components/global', true, /\.vue$/)
    const exportComponents = []
    components.keys().forEach((key) => {
        const component = components(key)
        exportComponents.push(component)
    })
    return exportComponents
}

/**
 *? object for providing global variables
 *? to be used in the app
 *? (e.g. global variables, functions, etc.)
 */

/**
 * @key name name of the global variable
 * @key value value of the global variable
 */

const data = [
    {
        name: '$Notify',
        value: Notify,
    },
    {
        name: '$jwtExpiresIn',
        value: jwtExpiresIn,
    },
    {
        name: '$getJWTFromCookie',
        value: getJWTFromCookie,
    },
    {
        name: '$removeJwtCookie',
        value: removeJwtCookie,
    },
    {
        name: '$setJwtCookie',
        value: setJwtCookie,
    },
]

/**
 * Working with global Vue Instance
 * Get Vue instance
 * @param {Element} app Vue instance
 */

export const initGlobalApp = (app) => {
    init()
    if (!app) throw new Error('App is not valid')
    data.forEach((item) => app.provide(item.name, item.value))
    if (process.env.NODE_ENV === 'development')
        console.log('🚀 ~ file: globals.js Providing globals', app._context.provides)
    autoImportComponents()
}

//# sourceMpappingURL=globals.js.map
