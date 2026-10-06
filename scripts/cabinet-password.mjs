// Хэш пароля студии для STUDIO_PASSWORD_HASH. Пароль вводится без эха
// и никуда не пишется; в консоль выводится только хэш.
//   npm run cabinet:password
import { randomBytes, scrypt } from "node:crypto";
import readline from "node:readline";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
let muted = false;
rl._writeToOutput = (text) => {
  if (!muted) rl.output.write(text);
};

rl.question("Пароль студии: ", (password) => {
  rl.output.write("\n");
  rl.close();
  if (password.length < 12) {
    console.error("Нужно не меньше 12 символов.");
    process.exit(1);
  }
  const salt = randomBytes(16);
  scrypt(password, salt, 64, { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 }, (error, key) => {
    if (error) throw error;
    console.log(`STUDIO_PASSWORD_HASH=scrypt:16384:8:1:${salt.toString("base64url")}:${key.toString("base64url")}`);
  });
});
muted = true;
