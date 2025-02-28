import { Package } from "@game/core/Package";
import { IDataProvider } from "./IDataProvider";

export interface IDataContext {
    readonly packageInfo: Package;
    readonly data: any;
    readonly dataProvider: IDataProvider;
}