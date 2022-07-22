import fs from 'fs/promises';
import * as TE from 'fp-ts/TaskEither';

export const createDirectory = (path: string): TE.TaskEither<Error, void> =>
  TE.tryCatch(
    () => fs.mkdir(path),
    (reason: unknown) => new Error(reason as string),
  );
