module.exports = {
	'asserts title': function (browser) {
    browser
      .url(browser.globals.devServerURL)
      .assert.title('Force Vue')
      .pause(2000)
      .end()
  },

  'tests if the page is loading': function (browser) {
    browser
      .url(browser.globals.devServerURL)
      .assert.elementPresent('.mdl-layout')
      .pause(2000)
      .end()
  },
}
