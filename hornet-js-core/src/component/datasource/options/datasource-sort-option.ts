import { SortData } from "src/component/sort-data";
import { DefaultSort } from "src/component/datasource/options/datasource-option";
import { DataSourceOption } from "src/component/datasource/options/datasource-option";

export interface DatasourceSortOption {
    /** Informations de tri */
    sortDatas?: SortData[];
    /** Méthode de tri custom */
    compare?: ((sortDatas: SortData, a: any, b: any) => number) | DefaultSort;
    /** Méthode de tri custom */
    getCompareFunction?: (number: number) => Function;

}
