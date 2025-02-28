import { Package } from "./Package";

export class NamedObject {
    private static lastID: number;

    private m_package: Package;
    private m_localID: string;
    private m_name: string;
    private m_id: string;
    private m_uid: number;


    static {
        NamedObject.lastID = 0;
    }

    constructor(pkg: Package, localID: string, name: string) {
        this.m_package = pkg;
        this.m_localID = localID;
        this.m_name = name;
        this.m_id = NamedObject.formatID(this.m_package.id, this.m_localID);
        this.m_uid = NamedObject.lastID++;
    }

    /**
     * @returns the package that this object belongs to.
     */
    get packageID(): string {
        return this.m_package.id;
    }

    /**
    * @returns a unique identifier compromised of the objects package and id.
    */
    get id(): string {
        return this.m_id;
    }

    /**
     * @returns the string id of the object.
     */
    get localID(): string {
        return this.m_localID;
    }

    /**
     * @returns a friendly name for the object.
     */
    get displayName(): string {
        return this.m_name;
    }

    /**
     * @returns a unique object id that is created at object initialisation. This id is NOT deterministic.
     */
    get uid(): number {
        return this.m_uid;
    }

    public static formatID(packageID: string, objectID: string) {
        return `${packageID}.${objectID}`
    }
}