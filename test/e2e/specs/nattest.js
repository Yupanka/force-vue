
var _ = require ('lodash');
var menu = require('../ui-properties/menu.js');
var contact = require('../pages/contact.js');
var about = require('../pages/about.js');

var defaultData = {
        name: '',
        email: '',
        note: ''
      };

var feedback = [
	{
		name: 'Szczecinska szczotka',
		email: 'szczotka@szczecin.pl',
		note: 'Pospeszcie pastuszki z piosneczki'
	},
	{
		name: '$@1^@%0&',
		email: '390beutelratenlatengitterkofer@stottentrottelhottentotenmutterattentater.com',
		note: 'Deutsch ist enfach',
	}
]

module.exports = {
	before : function(browser) {
    	browser
      		.url(browser.globals.devServerURL)
      		.waitForElementVisible(menu.menuItems.contact, 5000)
      		.click(menu.menuItems.contact)
      		.waitForElementVisible(contact.elements.contactTitle, 5000);
  	},

  	after : function(browser) {
    	browser.end();
  	},

	
  	'verify that menu Contact opens the correct page': function (browser) {
    	browser.getText(contact.elements.contactTitle, function(txt) {
    		this.assert.equal(txt.value, 'Contact')
  		});
  		browser.expect.element(contact.elements.nameField).to.be.visible;
  		browser.expect.element(contact.elements.emailField).to.be.visible;
  		browser.expect.element(contact.elements.noteField).to.be.visible;
  		browser.expect.element(contact.elements.submitButton).to.be.visible;
      browser.expect.element(contact.elements.cancelButton).to.be.visible;
  	},

  	'verify navigation from Contact to About and back': function (browser) {
    	browser
   			.url(browser.globals.devServerURL + '/?#contact')
      		.waitForElementVisible(menu.menuItems.about, 5000)
      		.click(menu.menuItems.about)
      		.waitForElementVisible(about.elements.aboutTitle, 5000)
      		.getText(about.elements.aboutTitle, function(txt) {
        		this.assert.equal(txt.value, 'About');
      		})
      		.click(menu.menuItems.contact)
      		.waitForElementVisible(contact.elements.contactTitle, 5000)
      		.getText(contact.elements.contactTitle, function(txt) {
	    		this.assert.equal(txt.value, 'Contact')
	  		});
  	},

  	'verify the user can fill out and submit the form': function (browser) {
  		_.forEach(feedback, function(el, ind) {
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
  				.click(contact.elements.submitButton);
  		});
    },

    'verify that Cancel button clears the form': function (browser) {
      browser
        .clearValue(contact.elements.nameField)
        .keys(_.head(feedback).name)
        .clearValue(contact.elements.emailField)
        .keys(_.head(feedback).email)
        .clearValue(contact.elements.noteField)
        .keys(_.head(feedback).note)
        .click(contact.elements.cancelButton)
        .assert.attributeEquals(contact.elements.nameField, "value", defaultData.name)
        .assert.attributeEquals(contact.elements.emailField, "value", defaultData.email)
        .assert.attributeEquals(contact.elements.noteField, "value", defaultData.note)
    },

   

}
