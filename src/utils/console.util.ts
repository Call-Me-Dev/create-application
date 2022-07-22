import * as C from 'fp-ts/Console';
import * as D from 'fp-ts/Date';
import * as IO from 'fp-ts/IO';
import { pipe } from 'fp-ts/function';

export const error = (error: Error): IO.IO<void> => pipe(
  D.create,
  IO.chain((time: Date) => C.log(`\x1b[31m${time.toLocaleString()} | ${error.message}\x1b[0m`)),
);
