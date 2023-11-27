export function debounce(func: Function, wait: number) {
  let timeout: number | null = null;
  return function (this: any, ...args: any[]) {
    const context = this;
    if (timeout) window.clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}
