import React from 'react';
import { InjectIdentificator } from './types';
import { ContainerContext } from './provider';

export function useInjectable<T1>(identifier: InjectIdentificator){
  const container = React.useContext(ContainerContext);

  return container.get(identifier);
};
