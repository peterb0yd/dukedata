
interface PromiseFulfilledResult<T> {
  status: "fulfilled";
  value: T;
}

interface PromiseRejectedResult {
  status: "rejected";
  reason: any;
}

type PromiseSettledResult<T> = PromiseFulfilledResult<T> | PromiseRejectedResult;

export const fulfilledPromiseValues = (promiseResults: Array<any>) => {
  return promiseResults
    .filter(res => res.status === 'fulfilled')
    .map(res => res.status === 'fulfilled' && res.value)
}