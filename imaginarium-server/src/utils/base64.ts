export class Base64 {
  decode(input: string): string {
    return Buffer.from(input, 'base64').toString('utf8');
  }

  encode(input: string): string {
    return Buffer.from(input, 'utf8').toString('base64');
  }
}
