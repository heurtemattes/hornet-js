#!groovy

//
// Custom environment variables
//
def mapEnv = [:]

// Projet
mapEnv["PROJECT_ID"] = "hornet"
mapEnv["PROJECT_GROUP"] = "fr.gouv.diplomatie." + mapEnv["PROJECT_ID"]


pipeline {
    agent {
        label "hornet-js"
    }

    options {
        buildDiscarder(logRotator(artifactDaysToKeepStr: "20", artifactNumToKeepStr: "1", daysToKeepStr: "90", numToKeepStr: "20"))
        disableConcurrentBuilds()
    }

    stages {

        stage("Install Builder") {
            steps {
				dir("${WORKSPACE}") {
					script {
						// Load HornetJsBuilder version from package.json
						mapEnv["HORNETJSBUILDER_VERSION"] = sh(script:"node -p \"require(\'${WORKSPACE}/package.json\').hornetJsBuilder\"", returnStdout:true).trim()
						mapEnv["HORNETJSBUILDER_BASE"] = "/var/lib/jenkins/.hbw/" + mapEnv["HORNETJSBUILDER_VERSION"]

						def propEnv = mapEnv.collect { key, value -> return key+'='+value }
						withEnv(propEnv) {
						    withNPM(npmrcConfig: "npmrc_hornet") {
						        sh '''
						            echo "Install hornet-js-builder@$HORNETJSBUILDER_VERSION"
						            echo "${HORNETJSBUILDER_VERSION}" > hb_version
						            bash hbw.sh --version
						           '''
							}
			            }
					}
				}
            }
            post {
                success {
                    echo "[SUCCESS] Success to install builder"
                }
                failure {
                    echo "[FAILURE] Failed to install builder"
                }
            }
        }


        stage("Initialize") {
            steps {
				dir("${WORKSPACE}") {
					configFileProvider([configFile(fileId: 'hornet-js-build-settings.properties', variable: 'BUILD_SETTINGS')]) {
						script {
							def buildSettings = readProperties file:"${BUILD_SETTINGS}"
							mapEnv << buildSettings
						}
					}
					script {
						mapEnv["MODULE_ID"] = sh(script:"node -p \"require(\'${WORKSPACE}/package.json\').name\"", returnStdout:true).trim()
						mapEnv["MODULE_GROUP"] = "fr.gouv.diplomatie." + mapEnv["MODULE_ID"]
						mapEnv["MODULE_GROUP_PUB"] = "fr/gouv/diplomatie/" + mapEnv["MODULE_ID"]
						mapEnv["MODULE_VERSION"] = sh(script:"node -p \"require(\'${WORKSPACE}/package.json\').version\"", returnStdout:true).trim()

						mapEnv["MODULE_DESCRIPTION"] = sh(script:"node -p \"require(\'${WORKSPACE}/package.json\').description\"", returnStdout:true).trim()
						mapEnv["MODULE_AUTHOR"] = sh(script:"node -p \"require(\'${WORKSPACE}/package.json\').author\"", returnStdout:true).trim()

						// Construction
						mapEnv["BUILD_TIMESTAMP"] = sh(script: 'date +%Y%m%d.%H%M%S', returnStdout:true).trim()

						if ( BRANCH_NAME.equals("develop") ) {
							mapEnv["BUILD_VERSION"] = mapEnv["MODULE_VERSION"] + "-" + mapEnv["BUILD_TIMESTAMP"] + "-" + env.BUILD_NUMBER
						} else if ( BRANCH_NAME.equals("release_candidate") ) {
							mapEnv["BUILD_VERSION"] = "RC"
						} else if ( BRANCH_NAME.equals("master") ) {
							mapEnv["BUILD_VERSION"] = mapEnv["MODULE_VERSION"]
						}

						// Publication
						mapEnv["REPOSITORY_BASENAME"] = mapEnv["PROJECT_ID"]

						if ( BRANCH_NAME.equals("develop") || BRANCH_NAME.equals("release_candidate") ) {
							mapEnv["PUBLISH_VERSION"] = mapEnv["MODULE_VERSION"] + "-SNAPSHOT"
							mapEnv["PUBLISH_REPOSITORY_NPM"] = mapEnv["REPOSITORY_BASENAME"] + "-npm-snapshot"
						} else if ( BRANCH_NAME.equals("master")) {
							mapEnv["PUBLISH_VERSION"] = mapEnv["MODULE_VERSION"]
							mapEnv["PUBLISH_REPOSITORY_NPM"] = mapEnv["REPOSITORY_BASENAME"] + "-npm-release"
						}

						def propEnv = mapEnv.collect { key, value -> return key+'='+value }
						withEnv(propEnv) {
			                echo sh(script: "env|sort", returnStdout: true)

				            sh '''
				                bash hbw.sh versions:set --versionFix=${BUILD_VERSION} -E
				            '''
						}
					}
				}
			}
            post {
                success {
                    echo "[SUCCESS] Success to Initialize"
                }
                failure {
                    echo "[FAILURE] Failed to Initialize"
                }
            }
        }


        stage("Build artifacts") {
            steps {
				dir("${WORKSPACE}") {
					script {
						def propEnv = mapEnv.collect { key, value -> return key+'='+value }
						withEnv(propEnv) {
			                sh "bash hbw.sh publish --publish-registry ${ARTIFACTORY_URL}/api/npm/${PUBLISH_REPOSITORY_NPM} --skipTests  -E"
						}
					}
				}
            }
            post {
                success {
                    echo "[SUCCESS] Success to Build artifacts"
                }
                failure {
                    echo "[FAILURE] Failed to Build artifacts"
                }
            }
        }

        stage("Test") {

            steps {
				dir("${WORKSPACE}") {
					script {
                        mapEnv["NODE_ENV"] = "integration"
						def propEnv = mapEnv.collect { key, value -> return key+'='+value }
						withEnv(propEnv) {
						    sh "xvfb-run bash hbw.sh test"
						}
					}
				}
            }
            post {
                success {
                    echo "[SUCCESS] Success to Test"
                }
                failure {
                    echo "[FAILURE] Failed to Test"
                }
            }
        }


        stage("Quality") {        
            steps {
                dir("${WORKSPACE}") {
                    script {
                        def propEnv = mapEnv.collect { key, value -> return key+'='+value }
                        withEnv(propEnv) {
                            scannerHome = tool "SonarQube Scanner ${SONAR_SCANNER_CLI}"
                    
                            withCredentials([usernamePassword(credentialsId: "${SONAR_CREDENTIALS_KEY}", passwordVariable: "SONAR_CREDENTIALS_PSW", usernameVariable: "SONAR_CREDENTIALS_LOGIN")]) {
                                sh '''
                                    echo "
                                    sonar.host.url=${SONAR_URL}
                                    sonar.login=${SONAR_CREDENTIALS_PSW}
                                    sonar.projectKey=${MODULE_GROUP}:${MODULE_ID}
                                    sonar.projectName=${MODULE_ID}
                                    sonar.projectVersion=${VERSION_SNAPSHOT}
                                    sonar.sourceEncoding=UTF-8

                                    sonar.modules=hornet-js-batch,hornet-js-bean, hornet-js-components, hornet-js-core, hornet-js-database, hornet-js-passport, hornet-js-react-components, hornet-js-test, hornet-js-utils

                                    hornet-js-batch.sonar.projectName=hornet-js-batch
                                    hornet-js-batch.sonar.sources=src
                                    hornet-js-batch.sonar.testExecutionReportPaths=test_report/mocha/test-results.xml
                                    hornet-js-bean.sonar.projectName=hornet-js-bean
                                    hornet-js-bean.sonar.sources=src
                                    hornet-js-bean.sonar.tests=test
                                    hornet-js-bean.sonar.testExecutionReportPaths=test_report/mocha/test-results.xml
                                    hornet-js-components.sonar.projectName=hornet-js-components
                                    hornet-js-components.sonar.sources=src
                                    hornet-js-components.tests=test
                                    hornet-js-components.sonar.testExecutionReportPaths=test_report/mocha/test-results.xml
                                    hornet-js-core.sonar.projectName=hornet-js-core
                                    hornet-js-core.sonar.sources=src
                                    hornet-js-core.sonar.tests=test
                                    hornet-js-core.sonar.testExecutionReportPaths=test_report/mocha/test-results.xml, test_report/karma/test-sonar-results.xml
                                    hornet-js-database.sonar.projectName=hornet-js-database
                                    hornet-js-database.sonar.sources=src
                                    hornet-js-database.sonar.tests=test
                                    hornet-js-database.sonar.testExecutionReportPaths=test_report/mocha/test-results.xml
                                    hornet-js-passport.sonar.projectName=hornet-js-passport
                                    hornet-js-passport.sonar.sources=src
                                    hornet-js-passport.sonar.testExecutionReportPaths=test_report/mocha/test-results.xml
                                    hornet-js-react-components.sonar.projectName=hornet-js-react-components
                                    hornet-js-react-components.sonar.sources=src
                                    hornet-js-react-components.sonar.tests=test
                                    hornet-js-react-components.sonar.testExecutionReportPaths=test_report/mocha/test-results.xml, test_report/karma/test-sonar-results.xml
                                    hornet-js-test.sonar.projectName=hornet-js-test
                                    hornet-js-test.sonar.sources=src
                                    hornet-js-test.sonar.tests=test
                                    hornet-js-test.sonar.testExecutionReportPaths=test_report/mocha/test-results.xml
                                    hornet-js-utils.sonar.projectName=hornet-js-utils
                                    hornet-js-utils.sonar.sources=src
                                    hornet-js-utils.sonar.tests=test
                                    hornet-js-utils.sonar.testExecutionReportPaths=test_report/mocha/test-results.xml

                                    sonar.exclusions=**/node_modules/**,**/*.spec.ts
                                    
                                    sonar.tests=test
                                    sonar.test.inclusions=**/*-spec.ts, **/*.test.karma.tsx, **/*.test.karma.ts, **/*.test.karma.tslint

                                    sonar.language=ts
                                    sonar.baseDir=.
                                    sonar.ts.tslint.projectPath=.
                                    sonar.ts.tslint.path=${HORNETJSBUILDER_BASE}/node_modules/tslint/bin/tslint
                                    sonar.ts.tslint.configPath=${HORNETJSBUILDER_BASE}/src/conf/tslint.json
                                    sonar.ts.tslint.ruleConfigs=${HORNETJSBUILDER_BASE}/src/conf/tslint-rules.properties

                                    sonar.ts.coverage.lcovReportPath=test_report/remap/lcov/lcov.info

                                    " > sonar-project.properties
                                '''
                        }
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                    }
                
                }
            }

            post {
                success {
                    echo "[SUCCESS] Success to run Quality"
                }
                failure {
                    echo "[FAILURE] Failed to run Quality"
                }
            }
        }
    }
}
