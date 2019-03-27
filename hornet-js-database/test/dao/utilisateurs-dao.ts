import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import Map from "hornet-js-bean/src/decorators/Map";
import { UtilisateurMetier } from "test/models/user-mod";
import { HornetGenericDAO } from "src/sequelize/hornet-generic-dao";
import { HornetSequelizeInstanceModel } from "src/sequelize/hornet-sequelize-attributes";
import { ModelDAO } from "test/dao/model-dao";
import { UtilisateurAttributes } from "test/models/seq-user-mod";
import { inject } from "hornet-js-core/src/inject/inject";
import { injectable } from "hornet-js-core/src/inject/injectable";

const logger: Logger = Utils.getLogger("applitutoriel.src.dao.utilisateurs-dao");

@injectable()
export class UtilisateursDAO extends HornetGenericDAO<ModelDAO, HornetSequelizeInstanceModel<UtilisateurAttributes>> {

    constructor(entityName: string = "utilisateurEntity", @inject(ModelDAO) modelDAO?: ModelDAO) {
        super(modelDAO[entityName], modelDAO);
    }

    @Map(UtilisateurMetier)
    findOne(data): Promise<UtilisateurMetier> {
        return this.entity.findOne(data);
    }

    @Map(UtilisateurMetier)
    listerUtilisateurs(): Promise<Array<UtilisateurMetier>> {
        return this.entity.findAll();
    }

    updateById(id: number, data) {
        return this.entity.update(data, {where: {id}, individualHooks: true});
    }

    insert(data) {
        return this.insertGeneric(data);
    }

    deleteById(id: number | Array<number>) {
        return this.entity.destroy({where: {id}});
    }

    @Map(UtilisateurMetier)
    getRole(data): Promise<UtilisateurMetier> {
        return this.entity.findOne({
                where: {
                    login: data.login,
                    password: data.password
                },
                include: [{
                    model: this.modelDAO.roleEntity,
                    as: "listeRole"
                }]
            }
        );
    }

}
