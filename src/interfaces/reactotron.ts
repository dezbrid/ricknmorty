interface CustomCommand {
  command: string;
  description?: string;
  title: string;
  handler: () => void;
}

interface Display {
  name: string;
  value: any;
  preview?: string;
  important?: boolean;
  image?: string;
}

export interface Tron {
  log: ((...args: any[]) => void) | undefined;
  clear: (() => void) | undefined;
  customCommand: (arg: CustomCommand) => void;
  display: (arg: Display) => void;
}
