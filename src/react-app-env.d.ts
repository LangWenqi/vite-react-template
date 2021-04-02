/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production';
    readonly PUBLIC_URL: string;
  }
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

interface Window {
  [key: string]: any;

}

interface Document {
  [key: string]: any;
}

declare namespace React {
  interface HTMLAttributes {
    flex?: any;
    ['flex-box']?: any;
    ['flex-flex']?: any;
    ['flex-wrap']?: any;
    ref? :any;
  }
}