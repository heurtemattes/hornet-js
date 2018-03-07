import { DataSource } from "src/component/datasource/datasource";
import { Decorators } from "hornet-js-test/src/decorators";
import { BaseTest } from "hornet-js-test/src/base-test";
import { runTest } from "hornet-js-test/src/test-run";
import { HornetTestAssert } from "hornet-js-test/src/hornet-test-assert";
import { SortData, SortDirection } from "src/component/sort-data";
import { CompareMethod, DefaultSort } from "src/component/datasource/options/datasource-option";

@Decorators.describe("Class de test pour le sort des datasources")
class DatasourceSortTest extends BaseTest {

    dataSource: DataSource<any>;

    sort: Array<any>;

    readonly data: any[] = [
        {
            key: 4,
            value: "d"
        }, {
            key: 5,
            value: "e"
        }, {
            key: 2,
            value: "b"
        }, {
            key: 1,
            value: "a"
        }, {
            key: 3,
            value: "c"
        }
    ];

    readonly dataForCustomSort: any[] = [
        {
            key: 402,
            value: "d"
        }, {
            key: 54,
            value: "e"
        }, {
            key: 2018,
            value: "b"
        }, {
            key: 100,
            value: "a"
        }, {
            key: 37,
            value: "c"
        }
    ];

    readonly dataForCustomSortUpperCase: any[] = [
        {
            key: 402,
            value: "Dimanche"
        }, {
            key: 54,
            value: "dejeuner"
        }, {
            key: 55,
            value: "distance"
        }, {
            key: 2018,
            value: "artichaud"
        }, {
            key: 100,
            value: "Association"
        }, {
            key: 101,
            value: "atchoum"
        }
    ];

    readonly dataVille : any[] = [
        {
            lib: "BUDAPEST"
        }, {
            lib: "ABIDJAN"
        }, {
            lib: "PARIS"
        }, {
            lib: "BRASILIA"
        }
    ];



    @Decorators.it("Test initialisation d'un datasource")
    testCase1() {
        this.dataSource = new DataSource(this.data);
        let results = this.dataSource.results;
        HornetTestAssert.assertEquals(results.length, 5, "Datasource ne retourne pas suffisamment de résultat par rapport à data");
        this.end();
    };

    @Decorators.it("Test tri ascendant d'un datasource")
    testCase2() {
        this.dataSource = new DataSource(this.data);
        this.dataSource.on("sort", (sortedResult) => {
            HornetTestAssert.assertEquals(this.dataSource.results, sortedResult, "");
            HornetTestAssert.assertEquals("a", this.dataSource.results[ 0 ].value, "");
            HornetTestAssert.assertEquals("b", this.dataSource.results[ 1 ].value, "");
            HornetTestAssert.assertEquals("c", this.dataSource.results[ 2 ].value, "");
            HornetTestAssert.assertEquals("d", this.dataSource.results[ 3 ].value, "");
            HornetTestAssert.assertEquals("e", this.dataSource.results[ 4 ].value, "");
            this.end();
        });
        this.dataSource.sort({ sortDatas: [ new SortData("value", SortDirection.ASC) ] });
    }

    @Decorators.it("Test tri descendant d'un datasource")
    testCase3() {
        this.dataSource = new DataSource(this.data);
        this.dataSource.on("sort", (sortedResult) => {
            HornetTestAssert.assertEquals(this.dataSource.results, sortedResult, "");
            HornetTestAssert.assertEquals("a", this.dataSource.results[ 4 ].value, "");
            HornetTestAssert.assertEquals("b", this.dataSource.results[ 3 ].value, "");
            HornetTestAssert.assertEquals("c", this.dataSource.results[ 2 ].value, "");
            HornetTestAssert.assertEquals("d", this.dataSource.results[ 1 ].value, "");
            HornetTestAssert.assertEquals("e", this.dataSource.results[ 0 ].value, "");
            this.end();
        });
        this.dataSource.sort({ sortDatas: [ new SortData("value", SortDirection.DESC) ] });
    }

    @Decorators.it("Test tri ascendant d'un datasource à partir d'une méthode de comparaison")
    testCase4() {
        this.dataSource = new DataSource(this.dataForCustomSort);
        this.dataSource.on("sort", (sortedResult) => {
            HornetTestAssert.assertEquals(this.dataSource.results, sortedResult, "");
            HornetTestAssert.assertEquals("c", this.dataSource.results[ 0 ].value, "");
            HornetTestAssert.assertEquals("e", this.dataSource.results[ 1 ].value, "");
            HornetTestAssert.assertEquals("a", this.dataSource.results[ 2 ].value, "");
            HornetTestAssert.assertEquals("d", this.dataSource.results[ 3 ].value, "");
            HornetTestAssert.assertEquals("b", this.dataSource.results[ 4 ].value, "");
            this.end();
        });
        // this.dataSource.sort({compare: this.sortMethode});
        this.dataSource.sort({ compare: this.sortMethode });
    }

    @Decorators.it("Test tri ascendant d'un datasource à partir d'une méthode de comparaison sur Init")
    testCase5() {
        let sort: DefaultSort = new DefaultSort([ new SortData("key"), new SortData("value", SortDirection.ASC) ], this.sortMethode);
        this.dataSource = new DataSource(this.dataForCustomSort, {}, [ sort ]);
        this.dataSource.on("fetch", (result) => {
            HornetTestAssert.assertEquals("c", result[ 0 ].value, "");
            HornetTestAssert.assertEquals("e", result[ 1 ].value, "");
            HornetTestAssert.assertEquals("a", result[ 2 ].value, "");
            HornetTestAssert.assertEquals("d", result[ 3 ].value, "");
            HornetTestAssert.assertEquals("b", result[ 4 ].value, "");
            this.end();
        });
        this.dataSource.fetch(true);
    }

    @Decorators.it("Test tri ascendant d'un datasource sur Init")
    testCase6() {
        let sort: DefaultSort = new DefaultSort([ new SortData("value", SortDirection.ASC) ]);
        this.dataSource = new DataSource(this.data, {}, [ sort ]);
        this.dataSource.on("fetch", (result) => {
            HornetTestAssert.assertEquals(this.dataSource.results, result, "");
            HornetTestAssert.assertEquals("a", this.dataSource.results[ 0 ].value, "");
            HornetTestAssert.assertEquals("b", this.dataSource.results[ 1 ].value, "");
            HornetTestAssert.assertEquals("c", this.dataSource.results[ 2 ].value, "");
            HornetTestAssert.assertEquals("d", this.dataSource.results[ 3 ].value, "");
            HornetTestAssert.assertEquals("e", this.dataSource.results[ 4 ].value, "");
            this.end();
        });
        this.dataSource.fetch(true);
    }

    @Decorators.it("Test tri ascendant d'un datasource sur Init avec methodes de comparaison UPERCASE")
    testCase7() {
        let sort: DefaultSort = new DefaultSort([ new SortData("value", SortDirection.ASC) ], CompareMethod.COMPARE_WITH_UPPERCASE);
        this.dataSource = new DataSource(this.dataForCustomSortUpperCase, {}, [ sort ]);
        this.dataSource.on("fetch", (result) => {
            HornetTestAssert.assertEquals(this.dataSource.results, result, "");
            HornetTestAssert.assertEquals("artichaud", this.dataSource.results[ 0 ].value, "");
            HornetTestAssert.assertEquals("Association", this.dataSource.results[ 1 ].value, "");
            HornetTestAssert.assertEquals("atchoum", this.dataSource.results[ 2 ].value, "");
            HornetTestAssert.assertEquals("dejeuner", this.dataSource.results[ 3 ].value, "");
            HornetTestAssert.assertEquals("Dimanche", this.dataSource.results[ 4 ].value, "");
            HornetTestAssert.assertEquals("distance", this.dataSource.results[ 5 ].value, "");
            this.end();
        });
        this.dataSource.fetch(true);
    }

    @Decorators.it("Test tri ascendant d'un datasource sur Init avec methodes de comparaison LOWERCASE")
    testCase8() {
        let sort: DefaultSort = new DefaultSort([ new SortData("value", SortDirection.ASC) ], CompareMethod.COMPARE_WITH_LOWERCASE);
        this.dataSource = new DataSource(this.dataForCustomSortUpperCase, {}, [ sort ]);
        this.dataSource.on("fetch", (result) => {
            HornetTestAssert.assertEquals(this.dataSource.results, result, "");
            HornetTestAssert.assertEquals("artichaud", this.dataSource.results[ 0 ].value, "");
            HornetTestAssert.assertEquals("Association", this.dataSource.results[ 1 ].value, "");
            HornetTestAssert.assertEquals("atchoum", this.dataSource.results[ 2 ].value, "");
            HornetTestAssert.assertEquals("dejeuner", this.dataSource.results[ 3 ].value, "");
            HornetTestAssert.assertEquals("Dimanche", this.dataSource.results[ 4 ].value, "");
            HornetTestAssert.assertEquals("distance", this.dataSource.results[ 5 ].value, "");
            this.end();
        });
        this.dataSource.fetch(true);
    }

    @Decorators.it("Test tri descendant d'un datasource sur Init")
    testCase9() {
        let sort: DefaultSort = new DefaultSort([ new SortData("value", SortDirection.DESC) ]);
        this.dataSource = new DataSource(this.data, {}, [ sort ]);
        this.dataSource.on("fetch", (result) => {
            HornetTestAssert.assertEquals(this.dataSource.results, result, "");
            HornetTestAssert.assertEquals("a", this.dataSource.results[ 4 ].value, "");
            HornetTestAssert.assertEquals("b", this.dataSource.results[ 3 ].value, "");
            HornetTestAssert.assertEquals("c", this.dataSource.results[ 2 ].value, "");
            HornetTestAssert.assertEquals("d", this.dataSource.results[ 1 ].value, "");
            HornetTestAssert.assertEquals("e", this.dataSource.results[ 0 ].value, "");
            this.end();
        });
        this.dataSource.fetch(true);
    }

    @Decorators.it("Test tri ASC par défaut, puis action de tri DESC")
    testCase10() {
        let sort: DefaultSort = new DefaultSort([new SortData("lib", SortDirection.ASC)]);
        this.dataSource = new DataSource(this.dataVille, {}, [sort]);
        this.dataSource.on("fetch", (result) => {
            HornetTestAssert.assertEquals(this.dataSource.results, result, "");
            HornetTestAssert.assertEquals("ABIDJAN", this.dataSource.results[0].lib, "");
            HornetTestAssert.assertEquals("BRASILIA", this.dataSource.results[1].lib, "");
            HornetTestAssert.assertEquals("BUDAPEST", this.dataSource.results[2].lib, "");
            HornetTestAssert.assertEquals("PARIS", this.dataSource.results[3].lib, "");
            this.dataSource.on("sort", (result) => {
                HornetTestAssert.assertEquals(this.dataSource.results, result, "");
                HornetTestAssert.assertEquals("ABIDJAN", this.dataSource.results[3].lib, "");
                HornetTestAssert.assertEquals("BRASILIA", this.dataSource.results[2].lib, "");
                HornetTestAssert.assertEquals("BUDAPEST", this.dataSource.results[1].lib, "");
                HornetTestAssert.assertEquals("PARIS", this.dataSource.results[0].lib, "");
                this.end();
            });
            this.dataSource.sort({sortDatas: [new SortData("lib", SortDirection.DESC)]});
        });
        this.dataSource.fetch(true);
    }

    private sortMethode(sortData, a: any, b: any): number {
        return a.key - b.key;
    }
}
//lancement des Tests
runTest(new DatasourceSortTest());