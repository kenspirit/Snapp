/**
 * Zip.ts
 *
 * Created on: 2016-09-26
 *     Author: Adrian Hintze @Rydion
 *
 */

import { create as getNewArchiver, Archiver } from 'archiver';

const defaultHighWaterMark = 100000000; // TODO -normal- Why does this value work and lower ones not?

export default class Zip {
    public constructor(onError: (...args: any[]) => void, onFinish: (...args: any[]) => void) {
        this.zip = getNewArchiver('zip', { highWaterMark: defaultHighWaterMark });
        this.zip.on('error', onError);
        this.zip.on('finish', onFinish);
    }

    public directory(srcPath: string, dstPath: string): this {
        this.zip.directory(srcPath, dstPath);
        return this;
    }

    public file(path: string, options: any): this {
        this.zip.file(path, options);
        return this;
    }

    public append(contents: Buffer | string, options: any): this {
        this.zip.append(contents, options);
        return this;
    }

    public finalize(): void {
        this.zip.finalize();
    }

    public getStream(): NodeJS.ReadableStream {
        return <NodeJS.ReadableStream>this.zip;
    } 

    private zip: Archiver;
}
