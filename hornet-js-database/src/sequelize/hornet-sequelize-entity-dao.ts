import { HornetSequelizeModel } from "src/sequelize/hornet-sequelize-model";
import { HornetSequelizeEntity } from "src/sequelize/hornet-sequelize-entity";
import { Class, AbstractClass } from "hornet-js-utils/src/typescript-utils";
import { TechnicalError } from "hornet-js-utils/src/exception/technical-error";
import { CodesError } from "hornet-js-utils/src/exception/codes-error";

type Id<T> = { [P in keyof T]?: T[P] }

export class Entity {
    static idName:string = "";
    static entityName:string = "";
}

export class HornetSequelizeEntityDao<T extends HornetSequelizeModel, ENTITY extends Entity, ID> extends HornetSequelizeEntity<T> {

    protected entity: Class<ENTITY>;

    constructor(entity: Class<ENTITY>, modelDAO?: T) {
        super(modelDAO);
        if((entity as any).entityName) {
            throw new TechnicalError("ERR_TECH_" + CodesError.DATASOURCE_CONFIGURATION_ERROR, {message: "Entity must have a static entityName property."});
        } 
        if((entity as any).idName) {
            throw new TechnicalError("ERR_TECH_" + CodesError.DATASOURCE_CONFIGURATION_ERROR, {message: "Entity must have a static idName property."});
        } 
        this.entity = entity;
    }

    insert(data: ENTITY): Promise<ENTITY> {
        return this.modelDAO[(this.entity as any).entityName].create(data);
    }

    findAll(): Promise<Array<ENTITY>>{
        return this.modelDAO[(this.entity as any).entityName].findAll();
    }

    selectAll(selector: Partial<ENTITY>): Promise<Array<ENTITY>> {
        return this.modelDAO[(this.entity as any).entityName].findAll({
            where: selector
        });
    }

    selectById(id: ID): Promise<ENTITY> {
        return this.modelDAO[(this.entity as any).entityName].findOne({
            where: this.computeId(id)
        });
    }

    deleteById(id: ID): Promise<ENTITY>{
        return this.modelDAO[(this.entity as any).entityName].destroy({where: this.computeId(id)});
    }

    updateById(id: ID, data: ENTITY): Promise<any> {
        return this.modelDAO[(this.entity as any).entityName].update(data, {where: this.computeId(id)});
    }

    protected computeId(id: ID) {
        let where = {};
        where[(this.entity as any).idName] = id;
        return where;
    }

}