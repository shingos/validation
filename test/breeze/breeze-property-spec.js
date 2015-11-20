import {Validation} from '../../src/validation';
import {ObserverLocator} from 'aurelia-binding';
import {Expectations} from '../expectations';
import {ValidationConfig} from '../../src/validation-config';
import {EntityAspectMock} from '../breeze/entity-aspect-mock';
import {Container} from 'aurelia-dependency-injection';

describe('validation on breeze: properties', ()=> {
  let container;

  beforeEach(() => {
    container = new Container();
  });

  it('should be valid if the breeze property validation is valid', (done) => {
    var expectations = new Expectations(expect, done);
    let subject = { firstName : 'bob', entityAspect : new EntityAspectMock(false, false)   };
    let validation = new Validation(container.get(ObserverLocator)).onBreezeEntity(subject).ensure('firstName').isNotEmpty();

    expectations.assert(validation.validate(), true);
    expectations.validate();
  });

  it('should be invalid if the breeze property validation is not valid', (done) => {
    var expectations = new Expectations(expect, done);
    let subject = { firstName : 'bob', entityAspect : new EntityAspectMock(true, false)   };
    let validation = new Validation(container.get(ObserverLocator)).onBreezeEntity(subject).ensure('firstName').isNotEmpty();

    expectations.assert(validation.validate(), false);
    expectations.validate();
  });
});
