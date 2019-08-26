import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
router.beforeEach(function (to, from, next) {
  nprogress.start()
  if (to.path.startsWith('/home')) {
    let result = window.localStorage.getItem('user-info')
    if (result) {
      let userinfo = JSON.parse(result)
      if (userinfo && userinfo.token) {
        next()
      } else {
        next('/login')
      }
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
router.afterEach(function () {
  nprogress.done()
})

export default router
