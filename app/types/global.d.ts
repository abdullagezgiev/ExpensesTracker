declare module 'react-native-share' {
  export interface ShareOptions {
    title?: string;
    message?: string;
    url?: string;
    type?: string;
    subject?: string;
    filename?: string;
    failOnCancel?: boolean;
  }

  export default {
    open: (options: ShareOptions) => Promise<any>,
  };
}