import React from 'react';
import Box, { subscribe } from '@anissoft/box';
import { InjectIdentificator } from '../types';
import { ContainerContext } from '../Provider';
import { BOXES } from '../constants';

export function useService<T1>(
  identifier: InjectIdentificator,
  deps?: (newValue: T1) => boolean,
){
  const container = React.useContext(ContainerContext);
  const service: T1 = container.get(identifier);
  const [, setUpdate] = React.useState(Symbol('-__- '));

  React.useEffect(() => {
    const boxes: Box<any>[] = Reflect.getMetadata(BOXES, service);
    if (!boxes || boxes.length === 0) {
      return () => undefined;
    }
    return subscribe(() => {
      if (!deps || deps(service)) {
        setUpdate(Symbol('O__O '));
      }
    }, boxes);

  }, [service]);

  return service as T1;
};
