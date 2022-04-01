import { pipeline } from 'stream/promises';
import got from 'got';
import tar from 'tar';
import * as TE from 'fp-ts/TaskEither';

export const downloadAndExtractRepository = (destination: string) => (template: string) =>
  TE.tryCatch(
    () => pipeline(
      got.stream(`https://codeload.github.com/Call-Me-Dev/create-application/tar.gz/main`),
      tar.extract({ cwd: destination, strip: 3 }, [`create-application/templates/${template}`])
    ),
    () => new Error(),
  );
