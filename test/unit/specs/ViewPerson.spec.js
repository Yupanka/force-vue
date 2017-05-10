import Vue from 'vue';
import ViewPerson from '@/components/ViewPerson.vue';

describe('ViewPerson.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      template: '<div><view-person></view-person></div>',
      components: { ViewPerson },
    }).$mount();
    expect(vm.$el.querySelector('.randPersonBtn').textContent).to.contain('Random Person');
  });

  // Added by Natalie

  it('should display correct default data', () => {
// this verifies that the correct default values are displayed in the person data fields
    const vm = new Vue({
      template: '<div><view-person></view-person></div>',
      components: { ViewPerson }
    }).$mount();
    const defaultData = ViewPerson.data();

    expect(vm.$el.querySelector('#personDataName').value)
    .to.contain(defaultData.personData.name);
    expect(vm.$el.querySelector('#personDataHeight').value)
    .to.contain(defaultData.personData.height);
    expect(vm.$el.querySelector('#personDataMass').value)
    .to.contain(defaultData.personData.mass);
    expect(vm.$el.querySelector('#personDataHair').value)
    .to.contain(defaultData.personData.hair_color);
    expect(vm.$el.querySelector('#personDataEyes').value)
    .to.contain(defaultData.personData.eye_color);
    expect(vm.$el.querySelector('#personDataDOB').value)
    .to.contain(defaultData.personData.birth_year);
    expect(vm.$el.querySelector('#personDataGender').value)
    .to.contain(defaultData.personData.gender);
  });

  it('Should display new values if personData is changed', done => {
// verifies that if we change the data the new values will be displayed
    const newPerson = {
      name: 'El Carim',
      height: 'unstable',
      mass: 'unstable',
      hair_color: 'purple',
      eye_color: 'purple',
      birth_year: '1200',
      gender: 'changing'
    };
    const Ctor = Vue.extend(ViewPerson);
    const vm = new Ctor();
    vm.$mount();
    vm.personData = newPerson;
    Vue.nextTick(() => {
      expect(vm.$el.querySelector('#personDataName').value)
      .to.contain(newPerson.name);
      expect(vm.$el.querySelector('#personDataHeight').value)
      .to.contain(newPerson.height);
      expect(vm.$el.querySelector('#personDataMass').value)
      .to.contain(newPerson.mass);
      expect(vm.$el.querySelector('#personDataHair').value)
      .to.contain(newPerson.hair_color);
      expect(vm.$el.querySelector('#personDataEyes').value)
      .to.contain(newPerson.eye_color);
      expect(vm.$el.querySelector('#personDataDOB').value)
      .to.contain(newPerson.birth_year);
      expect(vm.$el.querySelector('#personDataGender').value)
      .to.contain(newPerson.gender);
      done();
    });
  });
});
