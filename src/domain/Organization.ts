
export class Organization {

    public organizationId : Number;
    public name : String;
    public region : String;

    public constructor(data : any) {
        this.organizationId = data.organizationId;
        this.name = data.name;
        this.region = data.region;
    }

}