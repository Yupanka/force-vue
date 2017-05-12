module.exports = {
  'default e2e tests': function (browser) {
    browser
      .url(browser.globals.devServerURL)
      .assert.elementPresent('.mdl-layout')
      .pause(2000)
      .end()
  },
}
