import { UtilisateurAttributes, utilisateurSequelizeAttibutes } from "test/models/seq-user-mod";
import { RoleAttributes, RoleModel } from "test/models/model-role";
import { RoleUtilisateurAttributes, RoleUtilisateurModel } from "test/models/model-role_utilisateur";
import { Entity, nextversionInteger, HornetEntity } from "src/decorators/dec-seq-entity";
import { SequelizeUtils } from "src/sequelize/sequelize-utils";
import { HornetSequelizeModel } from "src/sequelize/hornet-sequelize-model";
import { HornetSequelizeInstanceModel } from "src/sequelize/hornet-sequelize-attributes";
import { inject } from "hornet-js-core/src/inject/inject";
import { injectable } from "hornet-js-core/src/inject/injectable";

@injectable()
export class ModelDAO extends HornetSequelizeModel {

    @Entity("UTILISATEUR", utilisateurSequelizeAttibutes, { version: { nextVal: nextversionInteger } })
    public utilisateurEntity: HornetEntity<UtilisateurAttributes>;

    @Entity("role", RoleModel)
    public roleEntity: HornetEntity<RoleAttributes>;

    @Entity("role_utilisateur", RoleUtilisateurModel)
    public roleUtilisateurEntity: HornetEntity<RoleUtilisateurAttributes>;

    constructor(@inject("databaseConfigName") conf?: string) {
        super(conf);
        this.initUtilisateurEntity();
        this.initRoleEntity();
    }

    /** METHODS */

    private initUtilisateurEntity(): void {
        SequelizeUtils.initRelationBelongsToMany({ fromEntity: this.utilisateurEntity, toEntity: this.roleEntity, alias: "listeRole", foreignKey: "id_utilisateur", throughTable: "role_utilisateur" });
    }

    private initRoleEntity(): void {
        SequelizeUtils.initRelationBelongsToMany({ fromEntity: this.roleEntity, toEntity: this.utilisateurEntity, alias: "listeUser", foreignKey: "id_role", throughTable: "role_utilisateur" });
    }

}