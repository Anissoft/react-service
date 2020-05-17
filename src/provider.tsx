import React from 'react';
import { DEPENDENCIES } from './constants';
import { Constructor, InjectIdentificator } from './types';

export const ContainerContext = React.createContext<Map<InjectIdentificator, any>>(new Map());

export const Provider = ({ 
  services, 
  children 
}: React.PropsWithChildren<{ services: Record<InjectIdentificator, Constructor> }>
) => {
  const container = React.useRef((() => {
    function getInjectIdentificator(value: Constructor){
      return Object.keys(services).find(key => services[key] === value) as InjectIdentificator ;
    }
    const allServices: Map<InjectIdentificator, any> = new Map();
    const servicesWithDepsSet = Object.values(services)
      .map((constructor: Constructor) => {
        if (Reflect.hasOwnMetadata(DEPENDENCIES, constructor)) {
          const {parameters, properties}: {
            parameters: [number, InjectIdentificator][];
            properties: [string, InjectIdentificator][];
          } = Reflect.getMetadata(DEPENDENCIES, constructor);
        
          const deps = new Set([
            ...parameters.map(([, dep]) => dep ),
            ...properties.map(([, dep]) => dep ),
          ]);

          Array.from(deps).forEach((identificator) => {
            if (!services[identificator as any] ){
              throw new Error(`Unable to resolve dependency ${String(identificator)} for ${constructor} constructor. Make sure you have provided it.`); 
            }
          });

          return [constructor, deps] as [Constructor, Set<InjectIdentificator>];
        }
        return [constructor, new Set([])] as [Constructor, Set<InjectIdentificator>];
      });
    
    const [servicesWithoudDeps, servicesWithDeps] = servicesWithDepsSet.reduce((acc, serviceWithDepsSet) => {
      if (Array.from(serviceWithDepsSet[1]).length === 0) {
        acc[0].push(serviceWithDepsSet);
      } else {
        acc[1].push(serviceWithDepsSet);
      }
      return acc;
    }, [[],[]] as [[Constructor, Set<InjectIdentificator>][], [Constructor, Set<InjectIdentificator>][]]);

    servicesWithoudDeps.forEach(([Service]) => {
      allServices.set(getInjectIdentificator(Service), new Service());
    });

    function spawnServicesWithDependencies(servicesWithDependencies: [Constructor, Set<InjectIdentificator>][]) {
      const [readyToBeSpawned, notRedyToBeSpawned] = servicesWithDependencies.reduce((acc, serviceWithDepsSet) => {
        const ready = Array
          .from(serviceWithDepsSet[1])
          .every((identificator) => allServices.has(identificator));

        if (ready) {
          acc[0].push(serviceWithDepsSet);
        } else {
          acc[1].push(serviceWithDepsSet);
        }
        
        return acc;
      }, [[],[]] as [[Constructor, Set<InjectIdentificator>][], [Constructor, Set<InjectIdentificator>][]]);

      readyToBeSpawned.forEach(([Service]) => {
        const { parameters, properties }: {
          parameters: [number, InjectIdentificator][];
          properties: [string, InjectIdentificator][];
        } = Reflect.getMetadata(DEPENDENCIES, Service);

        const candidate = new Service(...parameters.reduce((acc, [index, identificator]) => {
          acc[index] = allServices.get(identificator);
          return acc;
        }, [] as any[]));

        properties.forEach(([name, identificator]) => {
          (candidate as any)[name] = allServices.get(identificator);
        });

        allServices.set(
          getInjectIdentificator(Service),
          candidate,
        );
      });

      if (notRedyToBeSpawned.length > 0) {
        spawnServicesWithDependencies(notRedyToBeSpawned);
      }
    }

    spawnServicesWithDependencies(servicesWithDeps);

    return allServices;
  })());

  return (
    <ContainerContext.Provider value={container.current}>
      {children}
    </ContainerContext.Provider>
  );
};