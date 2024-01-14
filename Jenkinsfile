pipeline {
    agent any

    tools {
        nodejs "NodeJs" // Replace "node" with the NodeJS installation name in Jenkins
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}