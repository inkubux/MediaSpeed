import path from 'path';
import shorthash from 'shorthash';

export default class BaseInfoProvider {
    execute(filePath, library) {
        return {
            uid: shorthash.unique(filePath),
            library_uid: library.uid,
            filePath: filePath,
            fileName: path.basename(filePath)
        };
    }
}
