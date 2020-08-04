import 'reflect-metadata';

import { DEPENDENCIES, PARAMETER_PREFIX, PROPERTY_PREFIX, SERVICE } from '../constants';
import { InjectIdentificator } from '../types';

const paramRegex = new RegExp(`^${PARAMETER_PREFIX}`);
const propRegex = new RegExp(`^${PROPERTY_PREFIX}`);

export function Service() {
  // eslint-disable-next-line func-names
  return function<T extends { new (...args: any[]): {} }>(originalConstructor: T) {
    const keys = Reflect.getMetadataKeys(originalConstructor);
    const parameters = keys
      .filter(key => paramRegex.test(key))
      .map(key => {
        const [,index] = key.split('::');
        return [+index, Reflect.getMetadata(key, originalConstructor)] as [number, InjectIdentificator];
      });
    const properties = keys
      .filter(key => propRegex.test(key))
      .map(key => {
        const [,name] = key.split('::');
        return [name, Reflect.getMetadata(key, originalConstructor)] as [string, InjectIdentificator];
      });
    
    // class $Service extends originalConstructor {
    //   constructor(...args: any[]) {
    //     super(...args);
    //   }
    // }
    
    Reflect.defineMetadata(DEPENDENCIES, { parameters, properties }, originalConstructor);
    Reflect.defineMetadata(SERVICE, true, originalConstructor);

    return originalConstructor;
  };
}