import 'reflect-metadata';
import { Metadata } from './metadata';

const parameterMetadataKey = Symbol('PARAMETER_METADATA');
const propertyMetadataKey = Symbol('PROPERTY_METADATA');

function injectMetadata(
  target: any,
  metadata: Metadata,
  propertyName: string,
  parameterIndex?: number
) {
  const isParameter = (typeof parameterIndex === 'number');
  const metadataKey = isParameter ? parameterMetadataKey : propertyMetadataKey;
  const key: string = isParameter && parameterIndex !== undefined 
    ? `${parameterIndex}` 
    : propertyName;

  // if the decorator is used as a parameter decorator, the property name must be provided
  if (isParameter && propertyName !== undefined) {
    throw new Error('ERROR_MSGS.INVALID_DECORATOR_OPERATION');
  }
  
  const existingMetadata: Record<string, Metadata[]> = Reflect.hasOwnMetadata(metadataKey, target)
    ? Reflect.getMetadata(metadataKey, target)
    : {};

  // get metadata for the decorated parameter by its index
  const candidate: Metadata[] = Array.isArray(existingMetadata[key])
    ? existingMetadata[key]
    : [];

  candidate.forEach(part => {
    if (part.key === metadata.key) {
      throw new Error(`${'ERROR_MSGS.DUPLICATED_METADATA'} ${part.key.toString()}`);
    }
  });

  candidate.push(metadata);
  existingMetadata[key] = candidate;
  Reflect.defineMetadata(metadataKey, existingMetadata, target);
}

export function Inject<T extends { new (...args: any[]): {} }>(constructor: T) {
  return function(
    target: any,
    propertyKey: string,
    parameterIndex?: number
  ) {
    debugger;
    if (constructor === undefined) {
      throw new Error(`Undefined constructor identifier for ${target.name}. Please, specify one`);
    }

    const metadata = new Metadata('METADATA_KEY.INJECT_TAG', constructor);

    injectMetadata(target,  metadata, propertyKey, parameterIndex, );
  };
}