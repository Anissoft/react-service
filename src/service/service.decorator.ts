import Box from '@anissoft/box';
import 'reflect-metadata';

import { BOXES , DEPENDENCIES, PARAMETER_PREFIX, PROPERTY_PREFIX, SERVICE, STATE_PREFIX, BOX } from '../constants';
import { InjectIdentificator, StateOptions } from '../types';

const paramRegex = new RegExp(`^${PARAMETER_PREFIX}`);
const propRegex = new RegExp(`^${PROPERTY_PREFIX}`);
const stateRegex = new RegExp(`^${STATE_PREFIX}`);

export function Service() {
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
    const states = keys
      .filter(key => stateRegex.test(key))
      .map(key => {
        const [,name] = key.split('::');
        return [name, Reflect.getMetadata(key, originalConstructor)] as [string, StateOptions];
      });
    
    class $Service extends originalConstructor {
      constructor(...args: any[]) {
        super(...args);
        const boxes: Box<any>[] = [];
        states.forEach(([name /* , options */] )=> {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          const box = new Box(this[name]);
          Object.defineProperty(this, String(name), { 
            get() {
              const candidate = box.get();
              Reflect.defineMetadata(BOX, box, candidate);
              return candidate;
            },
            set(value: any) {
              box.set(value);
            }
          });
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          Reflect.defineMetadata(BOX, box, this[name]);
          boxes.push(box);
        });
        Reflect.defineMetadata(BOXES, boxes, this);
      }
    }
    

    Reflect.defineMetadata(DEPENDENCIES, { parameters, properties }, $Service);
    Reflect.defineMetadata(SERVICE, true, $Service);

    return $Service;
  };
}