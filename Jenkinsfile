pipeline {
    agent any

    tools {
		nodejs "nodejs"
		python "python"
	}

    stages {
        // Gradle 빌드 스테이지: Spring Boot 프로젝트를 빌드합니다.
        stage('Gradle Build') {
            steps {
                // 'Backend' 디렉터리 내에서 작업을 실행합니다.
                dir('backend/daengdaeng') {
                    // gradlew 실행 권한 부여
                    sh 'chmod +x gradlew'
                    // gradlew를 사용해 프로젝트를 빌드하며 테스트는 제외합니다.
                    sh './gradlew clean build -x test'
                }
            }
        }

		stage('React Build') {
			steps {
				dir('frontend/daengdaeng') {
					sh 'npm install'
					sh 'npm run build'
				}
			}
		}

        stage('Flask Build') {
            steps {
                dir('backend/recommendFlask') {
                    sh 'pip install -r requirements.txt' // 필요한 Python 패키지 설치
                    sh 'gunicorn -w 4 -b :5000 your_app:app &'
                }
            }
        }

        // Docker 이미지 빌드 스테이지: Dockerfile을 기반으로 이미지를 빌드합니다.
		stage('Docker Build') {
			steps {
                dir('backend/daengdaeng') {
                    // 이미지를 빌드합니다.
                    sh 'docker build -t deangdeangpotato-backend:latest .'
// 일반 빌드가 deprecated 되어서, BuildKit을 사용하는 코드. 여기서는 안되서 이전 버젼으로 진행
//                     sh 'DOCKER_BUILDKIT=1 docker build -t herosof-trashbin:latest .'
                }

				dir('frontend/daengdaeng') {
					sh 'docker build -t deangdeangpotato-frontend:latest .'
				}

                dir('backend/recommendFlask') {
                    sh 'docker build -t deangdeangpotato-flask:latest .'
                }
			}
		}

        // 배포 스테이지: 이전에 실행 중인 'back' 컨테이너를 제거하고 새로운 이미지로 컨테이너를 실행합니다.
        stage('Deploy') {
            steps {
                // 실행 중인 'back' 컨테이너 제거
                sh 'docker rm -f back'
                sh 'docker rm -f front'
                sh 'docker rm -f flask'

                // 새로운 이미지로 'back' 컨테이너를 백그라운드에서 실행
                sh 'docker run -d --name back -p 8200:8200 -u root deangdeangpotato-backend:latest'
				sh 'docker run -d --name front -p 3126:3126 -u root deangdeangpotato-frontend:latest'
                sh 'docker run -d --name flask -p 5000:5000 -u root deangdeangpotato-flask:latest'
            }
        }

        // 완료 스테이지: 더이상 사용되지 않는 Docker 이미지를 제거합니다.
        stage('Finish') {
            steps {
                // 사용되지 않는 (dangling) 이미지를 찾아 제거합니다.
                sh 'docker images -qf dangling=true | xargs -I{} docker rmi {}'
            }
        }
    }
}
