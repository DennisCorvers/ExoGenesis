export class DataContainer {
    readonly packageID: string;
    readonly displayName: string;
    readonly data: IData;

    constructor(packageID: string, displayName: string, data: IData) {
        this.packageID = packageID;
        this.displayName = displayName;
        this.data = data;
    }
}

export interface IData {

}