<template>
  <div>
    <div class="mdl-grid portfolio-max-width portfolio-contact">
      <div class="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--4dp">
          <div class="mdl-card__title">
            <h2 data-qa="contactTitle"class="mdl-card__title-text">
              Contact
            </h2>
          </div>
          <div class="mdl-card__media">

          </div>
          <div class="mdl-card__supporting-text">
            <p>
              Please feel free to contact me, by submitting the info below.
            </p>
            <form name="contactForm" @submit.prevent="validateForm('contactForm')" data-vv-scope="contactForm">

            <p>
              <div :class="{ 'control': true }" v-mdl class="input mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('contactForm.name') }" name="name" type="text" class="mdl-textfield__input" id="contactInfoName" v-model="contactInfo.name">
                <label for="contactInfoName" class="mdl-textfield__label">Name</label>
              </div>
              <span id="contactInfoNameError" v-show="errors.has('contactForm.name')" class="help is-danger">{{ errors.first('contactForm.name') }}</span>
            </p>

            <p>
              <div :class="{ 'control': true }" v-mdl class="input mdl-textfield mdl-js-textfield mdl-textfield--floating-label">

                <input v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('contactForm.email') }" name="email" type="text" class="mdl-textfield__input" id="contactInfoEmail" v-model="contactInfo.email">
                <label for="contactInfoEmail" class="mdl-textfield__label">Email</label>
              </div>
              <span id="contactInfoEmailError" v-show="errors.has('contactForm.email')" class="help is-danger">{{ errors.first('contactForm.email') }}</span>
            </p>

            <p>
              <div :class="{ 'control': true }" v-mdl class="input mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <textarea v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('contactForm.note') }" name="note" type="text" class="mdl-textfield__input" id="contactInfoNote" v-model="contactInfo.note" rows="4"></textarea>
                <label for="contactInfoNote" class="mdl-textfield__label">Note</label>
              </div>
              <span id="contactInfoNoteError" v-show="errors.has('contactForm.note')" class="error help is-danger">{{ errors.first('contactForm.note') }}</span>
            </p>
                <p>
                  <button class="mdl-button
                                 mdl-js-button
                                 mdl-button--raised
                                 mdl-js-ripple-effect
                                 mdl-button--colored"
                          v-mdl
                          type="submit">
                    Submit
                  </button>
                  <button v-on:click="resetForm" class="mdl-button
                                 mdl-js-button
                                 mdl-button--raised
                                 mdl-js-ripple-effect
                                 "
                          v-mdl
                          type="reset">
                    Clear
                  </button>
                </p>
            </form>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
export default {
  data() {
    return {
      contactInfo: {
        name: '',
        email: '',
        note: '',
      }
    };
  },
  methods: {
    validateForm(scope) {
      this.$validator.validateAll(scope).then(result => {
        if (result) {
        // TODO: add actual functionality
          this.resetForm();
        }
      });
    },
    resetErrors() {
      this.errors.clear('contactForm');
    },
    resetForm() {
      this.contactInfo.name = '';
      this.contactInfo.email = '';
      this.contactInfo.note = '';
      this.$nextTick(() => {
        this.resetErrors();
      });
    },
  },
};
</script>
