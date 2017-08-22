// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'page renders with basic elements': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.filters')
      .assert.elementPresent('select')
      .assert.elementPresent('h1', 1)
      .assert.elementPresent('table')
      .end()
  },

  'page filters with filter selections': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .click('.filters ul li input[value="archival"]')
      .click('.filters ul li input[value="exclusive"]')
      .pause(500)
      .assert.attributeContains('table tbody tr td:nth-child(5) i', 'class', 'icon-checkmark')
      .assert.attributeContains('table tbody tr td:nth-child(11) i', 'class', 'icon-checkmark')
      .end()
  },

  'page filters with color selection': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .click('.filters select option[value="blue"]')
      .pause(500)
      .assert.containsText('table tbody tr td:nth-child(3)', 'Blue')
      .end()
  }
}
