/* eslint-disable max-classes-per-file */
import React from 'react';
import 'reflect-metadata';

import { Service, Inject, Provider, useService } from '../src/react-service';

export default {
  title: 'Sandbox',
  component: Provider,
};

@Service()
class DependencyOfDependency {
  constructor(
    // @Inject('DEPENDENCY') public dependency: Dependency,
  ){
    console.log('DependencyOfDependency constructor');
    console.log(this);
  }
}

@Service()
class Dependency {
  @Inject('DependencyOfDependency') private dependencyOfDependency: DependencyOfDependency;

  constructor(){
    console.log('Dependency constructor');
    console.log(this);
  }
}

@Service()
class Test {
  @Inject('DependencyOfDependency') private dependency2: DependencyOfDependency;

  constructor(
    @Inject('DEPENDENCY') public dependency: Dependency,
  ){
    console.log('Test constructor');
    console.log(this);
  }
}

const Example = () => {
  const test = useService<Test>('TEST');

  console.log(test);

  return (
    <>
    </>
  );
};

export const ContainerProvider = () => {
  return (
    <Provider services={{'TEST': Test, 'DEPENDENCY': Dependency, 'DependencyOfDependency': DependencyOfDependency}}>
      <Example />
    </Provider>
  );
};

