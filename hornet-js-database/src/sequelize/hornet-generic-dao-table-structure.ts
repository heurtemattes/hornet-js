import { HornetSequelizeEntity } from "src/sequelize/hornet-sequelize-entity";
import { Class, AbstractClass } from "hornet-js-utils/src/typescript-utils";
import { TechnicalError } from "hornet-js-utils/src/exception/technical-error";
import { CodesError } from "hornet-js-utils/src/exception/codes-error";
import { HornetSequelizeEntityAttributes, HornetSequelizeInstanceModel } from "src/sequelize/hornet-sequelize-attributes";
import { HornetGenericDAO } from "src/sequelize/hornet-generic-dao";
import { HornetSequelizeModel } from "src/sequelize/hornet-sequelize-model";
import { SequelizeUtils } from "src/sequelize/sequelize-utils";

export class HornetGenericDAOTableStructure<T extends HornetSequelizeModel, ENTITY
    extends HornetSequelizeEntityAttributes> extends HornetGenericDAO<T, ENTITY> {
    constructor(entity: Class<ENTITY>, modelDAO?: T) {
        super(entity, modelDAO);
    }

    selectInfoFromTable() {
        const schema: string = this.classEntity["options"]["schema"] || "public";
        const myQuery: string = `SELECT c.column_name as name, c.data_type as type, pgd.description
            from pg_catalog.pg_statio_all_tables as st
                inner join pg_catalog.pg_description pgd
                    on (pgd.objoid = st.relid)
                right outer join information_schema.columns c
                    on (pgd.objsubid=c.ordinal_position
                        and c.table_schema = st.schemaname
                        and c.table_name = st.relname)
            where table_schema = '${schema}'
                and table_name = '${this.classEntity["tableName"]}'`;
        return SequelizeUtils.getQuery().query(myQuery);
    }

}
