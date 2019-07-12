import { Class } from "hornet-js-utils/src/typescript-utils";
import { HornetEntity } from "src/decorators/dec-seq-entity";
import { HornetSequelizeEntityAttributes, HornetSequelizeInstanceModel } from "src/sequelize/hornet-sequelize-attributes";
import { HornetSequelizeModel } from "src/sequelize/hornet-sequelize-model";
import * as _ from "lodash";
import { BeanUtils } from "hornet-js-bean/src/bean-utils";
import { HornetDbConnector } from "src/sequelize/hornet-db-connector";
import { Promise } from "hornet-js-utils/src/promise-api";
import * as Sequelize from "sequelize";

type Id<T> = {[P in keyof T]?: T[P]};

export interface Paginate {
    // targeted page
    pageIndex: number;

    // number of items returned once a time
    itemsPerPage: number;
}

export interface Criteria {
    // attributs à retourner dans le contenu de la recherche
    attributes?: string[];

    // critères pour filtrer le contenu de la recherche
    where?: any;

    // Information de pagination pour le contenu de la recherche
    paginate?: Paginate;

    // Information d'inclusion d'une autre entitée dans le résultat de la recherche
    include?: any[];

    // Information de tri
    order?: any[];

    // Identifiant pour le contenu de la recherche
    // @NotImplementedYet
    id?: any;
}

export class HornetGenericDAO<T extends HornetSequelizeModel, ENTITY
    extends HornetSequelizeEntityAttributes> extends HornetDbConnector<T> {
    protected classEntity: Class<ENTITY>;
    entity: Class<HornetEntity<Sequelize.ModelAttributes>>;
    
    constructor(entity: Class<ENTITY>, modelDAO?: T) {
        super(modelDAO);
        this.classEntity = entity;
        this.classEntity["idName"] = entity["primaryKeyAttribute"];
        this.entity = this.modelDAO[this.classEntity["entityName"]];
    }

    /**
     * Méthode d'insertion de données reposant sur le create de Sequelize
     * @param data Données pour créer l'instance
     */
    insertGeneric<M>(data: M): Promise<ENTITY> {
        return this.modelDAO[this.classEntity["entityName"]]
            .create(data);
    }

    /**
     * Méthode de sélection d'un ensemble de données reposant sur le
     * findAll de Sequelize
     * M est un type dynamique lié au paramètre bean indiquant le type retour
     * contenu dans la promesse
     * @param criteres : critères de sélections
     * @param bean : Type dans lequel convertir les données retournées
     */
    findAllGeneric<M>(criteres?: Criteria, bean?: Class<M>): Promise<M[]> {
        if (criteres) {
            const p = this.modelDAO[this.classEntity["entityName"]]
                .findAll(this.getQueryObject(criteres));
            if (bean) {
                return p.then((results) => {
                    return BeanUtils.mapArray(bean, results);
                });
            }
            return p;
        }
        const p = this.modelDAO[this.classEntity["entityName"]].findAll();
        if (bean) {
            return p.then((results) => {
                return BeanUtils.mapArray(bean, results);
            });
        }
        return p;
    }

    /**
     * Méthode de sélection d'une instance reposant sur le
     * findOne de Sequelize
     * M est un type dynamique lié au paramètre bean indiquant le type retour
     * contenu dans la promesse
     * @param id : identifiant critère de sélection
     * @param bean : Type dans lequel convertir l'instance retournée
     */
    findByIdGeneric<M>(id: any, bean?: Class<M>): Promise<M> {
        const p = this.modelDAO[this.classEntity["entityName"]]
        .findOne({ where: this.computeId(id) });
        if (bean) {
            return p.then((result) => {
                return BeanUtils.mapObject(bean, result);
            });
        }
        return p;
    }

    /**
     * Méthode de suppression reposant sur le destroy de Sequelize
     * @param id : identifiant ou ensemble d'identifiant à supprimer
     */
    deleteByIdGeneric(id: any): Promise<number> {
        return this.modelDAO[this.classEntity["entityName"]]
            .destroy({ where: this.computeId(id) });
    }

    /**
     * Méthode de modification reposant sur l'update de Sequelize
     * @param id : identifiant ou ensemble d'identifiant à modifier
     */
    updateByIdGeneric<M>(id: any, data: M): Promise<any> {
        return this.modelDAO[this.classEntity["entityName"]]
            .update(data, { where: this.computeId(id) });
    }

    protected computeId(id: any) {
        const where = {};
        where[this.classEntity["idName"]] = id;
        return where;
    }

    /**
     * Transforme un Paginate en conf pagination/limiting pour Sequelize
     * @param paginate Configuration de type Paginate
     */
    protected getPaginationConf(paginate: Paginate): any {
        let offset: number = 0;
        if (paginate.pageIndex > 1) {
            offset = paginate.pageIndex * paginate.itemsPerPage;
        }
        const limit: number = paginate.itemsPerPage;
        return { offset, limit };
    }

    /**
     * Transforme un tableau d'attributs en liste d'attributs
     * à requêter par Sequelize
     * @param attributes
     */
    protected getAttributesConf(attributes: string[]): any {
        return { attributes };
    }

    /**
     * Utilise les informations fournies pour préparer les critères
     * de la requête utilisés par Sequelize
     * @param where
     */
    protected getWhereConf(where: Partial<ENTITY>): any {
        return { where };
    }

    protected getIncludeConf(include: any[]): any {
        return { include };
    }

    protected getOrderConf(order: any[]): any {
        return { order };
    }

    /**
     * Construit l'objet passé à la méthode de requêtage sequelize
     * @param criteres
     */
    protected getQueryObject(criteres: Criteria): any {
        let queryObject = {};
        if (criteres.attributes) {
            queryObject = _.assignIn(queryObject, this.getAttributesConf(criteres.attributes));
        }
        if (criteres.paginate) {
            queryObject = _.assignIn(queryObject, this.getPaginationConf(criteres.paginate));
        }
        if (criteres.where) {
            queryObject = _.assignIn(queryObject, this.getWhereConf(criteres.where));
        }
        if (criteres.include) {
            queryObject = _.assignIn(queryObject, this.getIncludeConf(criteres.include));
        }
        if (criteres.order) {
            queryObject = _.assignIn(queryObject, this.getOrderConf(criteres.order));
        }
        return queryObject;
    }

}
