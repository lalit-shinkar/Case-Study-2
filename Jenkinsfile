pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-1'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'develop', 
                url: 'https://github.com/lalit-shinkar/Case-Study-2.git'

                script {
                    // Capture short commit hash
                    env.GIT_COMMIT = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                }
            }
        }

        stage('Terraform Init & Apply') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'case_study_2_creds',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    dir('infra') {
                        sh 'terraform init -input=false'
                        sh 'terraform validate'
                        sh 'terraform apply -auto-approve -input=false'
                    }
                }
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                script {
                    sh 'docker buildx install || true'
                    withCredentials([
                        usernamePassword(
                            credentialsId: 'case-study-2-DockerHubcred',
                            usernameVariable: 'DOCKER_USERNAME',
                            passwordVariable: 'DOCKER_PASSWORD'
                        )
                    ]) {
                        sh '''
                            docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
                            chmod +x scripts/build_and_push.sh
                            ./scripts/build_and_push.sh ${GIT_COMMIT}
                        '''
                    }
                }
            }
        }

        stage('Generate Ansible Inventory') {
            steps {
                script {
                    // Get EC2 IP
                    env.EC2_IP = sh(
                        script: "cd infra && terraform output -raw public_ip", 
                        returnStdout: true
                    ).trim()

                    // Create ansible inventory
                    sh 'mkdir -p ansible'

                    writeFile file: 'ansible/hosts.ini', text: """
[webserver]
${env.EC2_IP} ansible_user=ubuntu

[webserver:vars]
ansible_python_interpreter=/usr/bin/python3
ansible_ssh_common_args='-o StrictHostKeyChecking=no'
"""
                    sh 'cat ansible/hosts.ini'
                }
            }
        }

        stage('Deploy with Ansible') {
            steps {
                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: 'ssh-keyPair-caseStudy2',
                        keyFileVariable: 'SSH_KEY_PATH'
                    )
                ]) {
                    script {
                        try {
                            sh """
                                mkdir -p ~/.ssh
                                chmod 600 $SSH_KEY_PATH
                                ssh-keyscan -H ${env.EC2_IP} >> ~/.ssh/known_hosts
                                ansible-playbook -i ansible/hosts.ini ansible/deploy.yml \
                                    --private-key=$SSH_KEY_PATH \
                                    -u ubuntu \
                                    -e "GIT_COMMIT=${env.GIT_COMMIT}"
                            """
                        } catch (Exception e) {
                            error "❌ Ansible playbook execution failed: ${e.getMessage()}"
                        }
                    }
                }
            }
        }
    }
}
