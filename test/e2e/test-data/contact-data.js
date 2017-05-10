var contact = require('../pages/contact.js');

module.exports = {
  defaultData: {
    name: '',
    email: '',
    note: ''
  },

  feedback: [
    {
      name: 'S',
      email: 'sz@sz.pl',
      note: 'S'
    },
    {
      name: '$@1^@%0&',
      email: '390beutelratenlatengitterkofer@stottentrottelhottentotenmutterattentater.com',
      note: 'Deutsch ist enfach',
    }
  ],

  missingInput: [
    {
      name: '',
      email: 'sz@sz.pl',
      note: 'S',
      err: contact.elements.nameError
    },
    {
      name: '$@1^@%0&',
      email: '',
      note: 'Deutsch ist enfach',
      err: contact.elements.emailError
    },
    {
      name: '$@1^@%0&',
      email: '390beutelratenlatengitterkofer@stottentrottelhottentotenmutterattentater.com',
      note: '',
      err: contact.elements.noteError
    }
  ],

  invalidEmail: [
    {
      name: 'Chrzaszcz',
      email: 'sz@.pl',
      note: 'S'
    },
    {
      name: '$@1^@%0&',
      email: 'efagefkasy',
      note: 'Deutsch ist enfach'
    },
    {
      name: '$@1^@%0&',
      email: 'email@domain',
      note: 'Deutsch ist enfach'
    },
    {
      name: '$@1^@%0&',
      email: 'email@domain.c',
      note: 'Deutsch ist enfach'
    }
  ]
};
