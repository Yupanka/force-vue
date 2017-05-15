var _ = require ('lodash');
var menu = require('../ui-properties/menu.js');
var contact = require('../pages/contact.js');
var data = require('../test-data/contact-data.js');
var about = require('../pages/about.js');

module.exports = {
  before : function(browser) {
    browser
      .url(browser.globals.devServerURL)
      .isVisible(menu.smallScreen.smallScreenButton, function (res) {
        if(res.value === true) {
          browser
          .click(menu.smallScreen.smallScreenButton)
          .waitForElementVisible(menu.smallScreen.ssContact, 5000)
          .click(menu.smallScreen.ssContact)
          .waitForElementVisible(contact.elements.contactTitle, 5000)
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
    browser.getText(contact.elements.contactTitle, function(txt) {
      this.verify.equal(txt.value, 'Contact')
    });
    // intentionally played with the Expect library
    browser.expect.element(contact.elements.nameField).to.be.visible;
    browser.expect.element(contact.elements.emailField).to.be.visible;
    browser.expect.element(contact.elements.noteField).to.be.visible;
    browser.expect.element(contact.elements.submitButton).to.be.visible;
    browser.expect.element(contact.elements.cancelButton).to.be.visible;
  },

  'verify the user can fill out form with valid values without errors': function (browser) {
    // since clearValue() doesn't work correctly, I've tried to use setValue to delete current input
    _.forEach(data.feedback, function(el, ind) {
      browser
        .setValue(contact.elements.nameField, [browser.Keys.CONTROL,'a', browser.Keys.BACK_SPACE])
        .setValue(contact.elements.nameField, el.name)
        .setValue(contact.elements.emailField, [browser.Keys.CONTROL,'a', browser.Keys.BACK_SPACE])
        .setValue(contact.elements.emailField, el.email)
        .setValue(contact.elements.noteField, [browser.Keys.CONTROL,'a', browser.Keys.BACK_SPACE])
        .setValue(contact.elements.noteField, el.note)
        .verify.attributeEquals(contact.elements.nameField, "value", el.name)
        .verify.attributeEquals(contact.elements.emailField, "value", el.email)
        .verify.attributeEquals(contact.elements.noteField, "value", el.note)
        .verify.hidden(contact.elements.nameError)
        .verify.hidden(contact.elements.emailError)
        .verify.hidden(contact.elements.noteError);
    });
  },

  'verify that Clear button clears the form': function (browser) {
    browser
      .setValue(contact.elements.nameField, [browser.Keys.CONTROL,'a', browser.Keys.BACK_SPACE])
      .setValue(contact.elements.nameField, _.head(data.feedback).name)
      .setValue(contact.elements.emailField, [browser.Keys.CONTROL,'a', browser.Keys.BACK_SPACE])
      .setValue(contact.elements.emailField, _.head(data.feedback).email)
      .setValue(contact.elements.noteField, [browser.Keys.CONTROL,'a', browser.Keys.BACK_SPACE])
      .setValue(contact.elements.noteField, _.head(data.feedback).note)
      .click(contact.elements.cancelButton)
      .verify.attributeEquals(contact.elements.nameField, "value", data.defaultData.name)
      .verify.attributeEquals(contact.elements.emailField, "value", data.defaultData.email)
      .verify.attributeEquals(contact.elements.noteField, "value", data.defaultData.note)
  },

  'verify the errors are displayed if input is missing': function (browser) {
    _.forEach(data.missingInput, function(el, ind) {
      browser
        .setValue(contact.elements.nameField, [browser.Keys.CONTROL,'a', browser.Keys.BACK_SPACE])
        .setValue(contact.elements.nameField, el.name)
        .setValue(contact.elements.emailField, [browser.Keys.CONTROL,'a', browser.Keys.BACK_SPACE])
        .setValue(contact.elements.emailField, el.email)
        .setValue(contact.elements.noteField, [browser.Keys.CONTROL,'a', browser.Keys.BACK_SPACE])
        .setValue(contact.elements.noteField, el.note)
        .verify.attributeEquals(contact.elements.nameField, "value", el.name)
        .verify.attributeEquals(contact.elements.emailField, "value", el.email)
        .verify.attributeEquals(contact.elements.noteField, "value", el.note)
        .verify.visible(el.err);
    });
  },

  'verify the error is displayed for invalid email': function (browser) {
    _.forEach(data.invalidEmail, function(el, ind) {
      browser
        .setValue(contact.elements.nameField, [browser.Keys.CONTROL,'a', browser.Keys.BACK_SPACE])
        .setValue(contact.elements.nameField, el.name)
        .setValue(contact.elements.emailField, [browser.Keys.CONTROL,'a', browser.Keys.BACK_SPACE])
        .setValue(contact.elements.emailField, el.email)
        .setValue(contact.elements.noteField, [browser.Keys.CONTROL,'a', browser.Keys.BACK_SPACE])
        .setValue(contact.elements.noteField, el.note)
        .verify.attributeEquals(contact.elements.nameField, "value", el.name)
        .verify.attributeEquals(contact.elements.emailField, "value", el.email)
        .verify.attributeEquals(contact.elements.noteField, "value", el.note)
        .verify.visible(contact.elements.emailError)
        .verify.containsText(contact.elements.emailError, 'valid email');
    });
  },

  'verify that input is validated on Submit': function (browser) {
    browser
      .setValue(contact.elements.nameField, [browser.Keys.CONTROL,'a', browser.Keys.BACK_SPACE])
      .setValue(contact.elements.nameField, data.defaultData.name)
      .setValue(contact.elements.emailField, [browser.Keys.CONTROL,'a', browser.Keys.BACK_SPACE])
      .setValue(contact.elements.emailField, data.defaultData.email)
      .setValue(contact.elements.noteField, [browser.Keys.CONTROL,'a', browser.Keys.BACK_SPACE])
      .setValue(contact.elements.noteField, data.defaultData.note)
      .click(contact.elements.submitButton)
      .verify.visible(contact.elements.nameError)
      .verify.visible(contact.elements.emailError)
      .verify.visible(contact.elements.noteError);
  }
}
