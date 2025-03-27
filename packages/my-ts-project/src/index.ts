#!/usr/bin/env node

export function greet(name: string): string {
  return `Hello, ${name}!`;
}

const name = process.argv[2] || "World";
console.log(greet(name));
