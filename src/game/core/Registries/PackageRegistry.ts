import { Package } from "../Package";

export class PackageRegistry {
    private m_registeredPackages: Map<string, Package>;

    constructor() {
        this.m_registeredPackages = new Map<string, Package>();
    }

    public hasRegisteredPackage(packageID: string): boolean {
        return this.m_registeredPackages.has(packageID);
    }

    public getPackage(packageID: string) : Package | null {
        return this.m_registeredPackages.get(packageID) || null;
    }

    public registerPackage(id: string, displayName: string): Package {
        if (this.m_registeredPackages.has(id)) {
            throw new Error(`Package with name ${id} is already registered.`);
        }

        const pkg = { id: id, displayName: displayName };
        this.m_registeredPackages.set(id, pkg);
        return pkg;
    }
}