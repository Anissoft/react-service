/* eslint-disable max-classes-per-file */
import React from 'react';
import 'reflect-metadata';

import { Service, Inject, Provider, State, useService, merge, update } from '../src/react-service';

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

  @State() public state = {foo: 0 };

  constructor(
    @Inject('DEPENDENCY') public dependency: Dependency,
  ){
    console.log('Test constructor');
    console.log(this);
  }
}

const Example = () => {
  const test = useService<Test>('TEST', (candidate => candidate.state.foo > 5));

  return (
    <>
      <pre>{JSON.stringify(test.state, null, 2)}</pre>
      <button
        type="submit"
        onClick={() => {
          test.state = { foo: test.state.foo + 1 };
        }}
      >
        Change state
      </button>
      <button
        type="submit"
        onClick={() => {
          merge(test.state, { foo: test.state.foo +1 });
        }}
      >
        Merge state
      </button>
      <button
        type="submit"
        onClick={() => {
          update(test.state, { foo: test.state.foo +1 });
        }}
      >
        Update state
      </button>
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

