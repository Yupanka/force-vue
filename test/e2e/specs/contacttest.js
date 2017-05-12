var _ = require ('lodash');
var menu = require('../ui-properties/menu.js');
var contact = require('../pages/contact.js');
var data = require('../test-data/contact-data.js');
var about = require('../pages/about.js');

module.exports = {
  before : function(browser) {
    browser
      .resizeWindow(1280, 800)
      .url(browser.globals.devServerURL)
      .isVisible(menu.smallScreen.smallScreenButton, function (res) {
        if(res.value === true) {
          browser
          .click(menu.smallScreen.smallScreenButton)
          .waitForElementVisible(menu.smallScreen.ssContact, 5000)
          .click(menu.smallScreen.ssContact)
          .waitForElementVisible(contact.elements.contactTitle, 5000)
          .click(contact.elements.contactTitle)
        }
        else {
          browser
          .waitForElementVisible(menu.menuItems.contact, 5000)
          .click(menu.menuItems.contact)
          .waitForElementVisible(contact.elements.contactTitle, 5000)
        }
      });
  },

  after : function(browser) {
    browser.end();
  },

  'verify that menu Contact opens the correct page': function (browser) {
    // intentionally played with the Expect library
    browser.getText(contact.elements.contactTitle, function(txt) {
      this.assert.equal(txt.value, 'Contact')
    });
    browser.expect.element(contact.elements.nameField).to.be.visible;
    browser.expect.element(contact.elements.emailField).to.be.visible;
    browser.expect.element(contact.elements.noteField).to.be.visible;
    browser.expect.element(contact.elements.submitButton).to.be.visible;
    browser.expect.element(contact.elements.cancelButton).to.be.visible;
  },

  'verify the user can fill out form with valid values without errors': function (browser) {
    _.forEach(data.feedback, function(el, ind) {
      browser
        .clearValue(contact.elements.nameField)
        .keys(el.name)
        .clearValue(contact.elements.emailField)
        .keys(el.email)
        .clearValue(contact.elements.noteField)
        .keys(el.note)
        .assert.attributeEquals(contact.elements.nameField, "value", el.name)
        .assert.attributeEquals(contact.elements.emailField, "value", el.email)
        .assert.attributeEquals(contact.elements.noteField, "value", el.note)
        .assert.hidden(contact.elements.nameError)
        .assert.hidden(contact.elements.emailError)
        .assert.hidden(contact.elements.noteError);
    });
  },

  'verify that Clear button clears the form': function (browser) {
    browser
      .clearValue(contact.elements.nameField)
      .keys(_.head(data.feedback).name)
      .clearValue(contact.elements.emailField)
      .keys(_.head(data.feedback).email)
      .clearValue(contact.elements.noteField)
      .keys(_.head(data.feedback).note)
      .click(contact.elements.cancelButton)
      .assert.attributeEquals(contact.elements.nameField, "value", data.defaultData.name)
      .assert.attributeEquals(contact.elements.emailField, "value", data.defaultData.email)
      .assert.attributeEquals(contact.elements.noteField, "value", data.defaultData.note)
  },

  'verify the errors are displayed if input is missing': function (browser) {
    _.forEach(data.missingInput, function(el, ind) {
      browser
        .clearValue(contact.elements.nameField)
        .keys(el.name)
        .clearValue(contact.elements.emailField)
        .keys(el.email)
        .clearValue(contact.elements.noteField)
        .keys(el.note)
        .assert.attributeEquals(contact.elements.nameField, "value", el.name)
        .assert.attributeEquals(contact.elements.emailField, "value", el.email)
        .assert.attributeEquals(contact.elements.noteField, "value", el.note)
        .assert.visible(el.err);
    });
  },

  'verify the error is displayed for invalid email': function (browser) {
    _.forEach(data.invalidEmail, function(el, ind) {
      browser
        .clearValue(contact.elements.nameField)
        .keys(el.name)
        .clearValue(contact.elements.emailField)
        .keys(el.email)
        .clearValue(contact.elements.noteField)
        .keys(el.note)
        .assert.attributeEquals(contact.elements.nameField, "value", el.name)
        .assert.attributeEquals(contact.elements.emailField, "value", el.email)
        .assert.attributeEquals(contact.elements.noteField, "value", el.note)
        .assert.visible(contact.elements.emailError)
        .assert.containsText(contact.elements.emailError, 'valid email');
    });
  },

  'verify that input is validated on Submit': function (browser) {
    browser
      .clearValue(contact.elements.nameField)
      .keys(data.defaultData.name)
      .clearValue(contact.elements.emailField)
      .keys(data.defaultData.email)
      .clearValue(contact.elements.noteField)
      .keys(data.defaultData.note)
      .click(contact.elements.submitButton)
      .assert.visible(contact.elements.nameError)
      .assert.visible(contact.elements.emailError)
      .assert.visible(contact.elements.noteError);
  }
}
