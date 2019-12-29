
type RecordOrValue<T> = T | {[index: string]: RecordOrValue<T> | Array<RecordOrValue<T>>} ;
function getIfProperty<T> (object: RecordOrValue<T>, property: string): T[] | T | null {
  if (object && typeof object === 'object') {
    const val = object[property];
    return Array.isArray(val) ? val as T[]: val as T;
  }
  return null;
}

export function *flatterator<T = any>(array: any[], props: string | string[]): IterableIterator<T> {
  let found = false;
  if (array) {
    array = makeArrayFromValue(array);
    const stack = array.slice();
    let item = null;
    /* eslint-disable-next-line no-cond-assign , require-atomic-updates */
    while (item = stack.shift()) {
      found = false;
      if (props) {
        props = makeArrayFromValue(props);
        for (const prop of props) {
          let propVal = getIfProperty(item, prop);
          if (propVal) {
            found = true;
            yield *flatterator<T>(propVal, props);
          }
        }
      }
      if (!found) {
        yield item;
      }
    }
  }
}

function makeArrayFromValue(val: any): any[] {
  if (!Array.isArray(val)) {
    return [val];
  }
  return val;
}
