import fs from 'fs-extra';

type 

export class DataWriter {
    constructor() 
    {

    }

    writeFile(path:string, data:JSON)
    {
        fs.writeFile(path,data)
    }
}