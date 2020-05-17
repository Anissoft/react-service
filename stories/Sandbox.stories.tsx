/* eslint-disable max-classes-per-file */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import 'reflect-metadata';
// import { text, boolean, withKnobs, number, select, button } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import { Injectable, Inject, Provider } from '../src/react-service';

const stories = storiesOf('Sandbox', module);

// const allInjectablesConstructors:  { new (...args: any[]): {} }[] = [];

@Injectable()
class DependencyOfDependency {
  constructor(){
    console.log('DependencyOfDependency constructor');
    console.log(this);
  }

  public property = 'property value';

  public method() {
    console.log('called method', this.property);
  }
}

@Injectable()
class Dependency {
  @Inject('DependencyOfDependency') private dependencyOfDependency: DependencyOfDependency;

  constructor(){
    console.log('Dependency constructor');
    console.log(this);
  }

  public property = 'property value';

  public method() {
    console.log('called method', this.property);
  }
}

@Injectable()
class Test {
  @Inject('DependencyOfDependency') private dependency2: DependencyOfDependency;

  constructor(
    @Inject('DEPENDENCY') public dependency: Dependency,
  ){
    console.log('Test constructor');
    console.log(this);
  }
}


stories.add('class', () => {
  return <Provider services={{'TEST': Test, 'DEPENDENCY': Dependency, 'DependencyOfDependency': DependencyOfDependency}} />;
});

