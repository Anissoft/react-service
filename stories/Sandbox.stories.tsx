/* eslint-disable max-classes-per-file */
import React from 'react';
import 'reflect-metadata';

import { Service, Inject, Provider, useService } from '../src/react-service';

export default {
  title: 'Sandbox',
  component: Provider,
};

const tags = {
  DependencyOfDependency: Symbol('DependencyOfDependency'),
  DEPENDENCY: Symbol('DEPENDENCY'),
  TEST: Symbol('TEST'),
};

@Service()
class DependencyOfDependency {
  constructor(
    // @Inject('DEPENDENCY') public dependency: Dependency,
  ) {
    console.log('DependencyOfDependency constructor');
    console.log(this);
  }
}

@Service()
class Dependency {
  @Inject(tags.DependencyOfDependency) private dependencyOfDependency: DependencyOfDependency;

  constructor() {
    console.log('Dependency constructor');
    console.log(this);
  }
}

@Service()
class Test {
  @Inject(tags.DependencyOfDependency) private dependency2: DependencyOfDependency;

  constructor(
    @Inject(tags.DEPENDENCY) public dependency: Dependency,
  ) {
    console.log('Test constructor');
    console.log(this);
  }
}

const Example = () => {
  const test = useService<Test>(tags.TEST);

  console.log(test);

  return (
    <>
    </>
  );
};

export const ContainerProvider = () => {
  return (
    <Provider services={{ [tags.TEST]: Test, [tags.DEPENDENCY]: Dependency, [tags.DependencyOfDependency]: DependencyOfDependency }}>
      <Example />
    </Provider>
  );
};

