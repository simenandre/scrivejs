import type { Runtype } from 'runtypes';

export function withRuntype<T>(validator: Runtype<T>) {
  return (data: unknown) => {
    return validator.check(data);
  };
}
