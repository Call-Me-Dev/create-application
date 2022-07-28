import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import { spawn } from 'cross-spawn';

export const installDependencies = (path: string): TE.TaskEither<Error, void> => TE.tryCatch(
  () => new Promise((resolve, reject) => {
    const child = spawn(
      'npm',
      ['install'],
      { stdio: 'inherit', cwd: path },
    );

    child.on('message', console.log);

    child.on('close', (code) => {
      if (code !== 0) reject(code);

      resolve();
    });
  }),
  E.toError,
);
