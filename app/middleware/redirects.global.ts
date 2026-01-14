export default defineNuxtRouteMiddleware((to) => {
  // Редиректы со старых HTML страниц на новые
  const redirects: Record<string, string> = {
    '/index.html': '/',
    '/cards.html': '/catalog',
    '/fabrics.html': '/catalog',
    '/prints.html': '/catalog',
    '/packs.html': '/catalog',
    '/scarfs.html': '/catalog',
    '/cart.html': '/cart',
    '/info.html': '/about',
  }

  const redirectPath = redirects[to.path]
  if (redirectPath && redirectPath !== to.path) {
    return navigateTo(redirectPath, { redirectCode: 301, replace: true })
  }
})

