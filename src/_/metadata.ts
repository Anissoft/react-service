export const INJECTABLE_METADATA_KEY = Symbol('injectable');

export class Metadata {
  public constructor(
    public key: string | number | symbol,
    public value: any
  ) { }

  public toString() {
    if (this.key ===' METADATA_KEY.NAMED_TAG') {
      return `named: ${this.value.toString()} `;
    } 
    return `tagged: { key:${this.key.toString()}, value: ${this.value} }`;
  }
}