import 'reflect-metadata';
import { DEPENDENCIES, PARAMETER_PREFIX, PROPERTY_PREFIX, INJECTABLE } from './constants';
import { InjectIdentificator } from './types';

const paramRegex = new RegExp(`^${PARAMETER_PREFIX}`);
const propRegex = new RegExp(`^${PROPERTY_PREFIX}`);

export function Injectable() {
  return function<T extends { new (...args: any[]): {} }>(constructor: T) {
    const keys = Reflect.getMetadataKeys(constructor);
    const parameters = keys
      .filter(key => paramRegex.test(key))
      .map(key => {
        const [,index] = key.split('::');
        return [+index, Reflect.getMetadata(key, constructor)] as [number, InjectIdentificator];
      });
    const properties = keys
      .filter(key => propRegex.test(key))
      .map(key => {
        const [,name] = key.split('::');
        return [name, Reflect.getMetadata(key, constructor)] as [string, InjectIdentificator];
      });

    Reflect.defineMetadata(DEPENDENCIES, { parameters, properties }, constructor);
    Reflect.defineMetadata(INJECTABLE, true, constructor);
  };
}