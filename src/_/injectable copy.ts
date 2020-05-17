import 'reflect-metadata';

export function Injectable() {
  return function<T extends { new (...args: any[]): {} }>(constructor: T) {
    const types = Reflect.getMetadata('METADATA_KEY.DESIGN_PARAM_TYPES', constructor) || [];
    Reflect.defineMetadata('METADATA_KEY.PARAM_TYPES', types, constructor);
    
    return constructor;
  };
}