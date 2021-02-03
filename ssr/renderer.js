const deleteLastSlash = (url) => url.replace(/\/$/, '')
const stripBase = (url, base) => (Boolean(base) ? url.replace(base, '') : url)

module.exports = async function renderer(renderOptions) {
    const initRouter = global.$$$easyrouteRouter
    if (!initRouter)
      throw new Error("[Easyroute SSR] Couldn't find Router factory")

    const { component, props, url } = renderOptions

    let [pathname, search] = url.split('?')
    search = Boolean(search) ? '?' + search : ''
    pathname = deleteLastSlash(pathname) + '/'

    const router = initRouter(true);

    await router.push(stripBase(`${pathname}${search}`, router.base))
    return component.render({
      ...props, router
    })
}