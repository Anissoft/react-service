/* eslint-disable max-classes-per-file */
import React from 'react';
import 'reflect-metadata';
// import { text, boolean, withKnobs, number, select, button } from '@storybook/addon-knobs';
// import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import { Injectable, Inject, Provider } from '../src/react-service';

const stories = storiesOf('Sandbox', module);

@Injectable()
class DependencyOfDependency {
  constructor(){
    console.log('DependencyOfDependency constructor');
    console.log(this);
  }
}

@Injectable()
class Dependency {
  @Inject('DependencyOfDependency') private dependencyOfDependency: DependencyOfDependency;

  constructor(){
    console.log('Dependency constructor');
    console.log(this);
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

