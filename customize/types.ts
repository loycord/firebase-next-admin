interface App {
  name: string;
  icon: any;
}

export interface Navigation {
  pathname: string;
  name: string;
  app?: App[];
}