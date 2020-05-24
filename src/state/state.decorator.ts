import Box from '@anissoft/box';
import { STATE_PREFIX, BOX } from '../constants';
import { StateOptions } from '../types';

export function State(options: StateOptions = {}) {
  return function(
    target: any,
    key: string | symbol,
  ) {
    Reflect.defineMetadata(`${STATE_PREFIX}${String(key)}`, options, target.constructor);
  };
}

export function merge<T1>(state: T1, value:  Partial<T1> | ((oldValue: T1) => Partial<T1>)) {
  const box: Box<T1> = Reflect.getMetadata(BOX, state);
  if (!box) {
    throw new Error(`${state} doesn't contains any state`);
  }

  return box.merge(value);
}

export function update<T1>(state: T1, value: T1): void;
export function update<T1>(state: T1, value: Partial<T1>): void;
export function update<T1>(state: T1, value: (oldValue: T1, candidate?: T1) => T1): void;
export function update<T1>(state: T1, value: (oldValue: T1, candidate?: Partial<T1>) => Partial<T1>): void;
export function update<T1>(
  state: T1, 
  value:  T1  
  | Partial<T1>
  | ((oldValue: T1, candidate?: T1) => T1)
  | ((oldValue: T1, candidate?: Partial<T1>) => Partial<T1>)
) {
  const box: Box<T1> = Reflect.getMetadata(BOX, state);
  if (!box) {
    throw new Error(`The ${state} doesn't contains any state`);
  }

  return box.update(value as any);
}
