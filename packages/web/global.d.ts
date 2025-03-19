/*
    for declaring the scss module in typescript for importing.
*/
declare module '*.scss';
declare module '*.png';
declare module '*.svg';
declare module '*.jpg';

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any; //For redux debugging extension in chrome.
}

interface NodeModule {
  hot: any; //To support hot reloading..
}

//For webpack
interface NodeRequire {
  context: any;
}

declare type EditingState =
  | null
  | 'loading'
  | 'loading-success'
  | 'loading-failed'
  | 'editing'
  | 'saving'
  | 'success'
  | 'failure'
  | 'abort'

declare type LoadingState = null | 'loading' | 'failure' | 'success' | 'abort';

type MergeTypes<A, B> = {
  [K in keyof A]: K extends keyof B ? B[K] : A[K];
} & B;
