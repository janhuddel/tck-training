export interface Data {
  id: string;
  name: string;
  value: number;
}

export class CoreService {
  greet(name: string): string {
    return `Hallo, ${name}!`;
  }
}
