import config from '../config/config.cfg'

const sharedFunctions = {
  anyCase: (value) => {
    return new RegExp('^' + value + '$', 'ig')
  },
  windowResolution: (fix, type = 'desktop') => {
    let width, height

    if (type === 'mobile') {
      width = config.resolution.mobileResolution.width
      height = config.resolution.mobileResolution.height
    } else {
      width = config.resolution.desktopResolution.width
      height = config.resolution.desktopResolution.height
    }
    fix.beforeEach(async t => {
      await t
        .resizeWindow(width, height)
    })
  }
}

export default sharedFunctions
