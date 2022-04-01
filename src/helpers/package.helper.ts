import { spawn } from 'cross-spawn';
import * as TE from 'fp-ts/TaskEither';

export const install = (directory: string): TE.TaskEither<Error, void> =>
  TE.tryCatch(
    () => new Promise((resolve, reject) => {
      const child = spawn(
        'yarn',
        ['--cwd', directory],
        { stdio: 'inherit' },
      );

      child.on('message', console.log);

      child.on('close', (code) => {
        if (code !== 0) reject(code);

        resolve();
      });
    }),
    () => new Error(),
  );
