import fs from 'fs/promises';
import * as TE from 'fp-ts/TaskEither';

export const createDirectory = (path: string): TE.TaskEither<Error, void> =>
  TE.tryCatch(
    async () => fs.mkdir(path),
    () => new Error(),
  );
