pipeline {
    agent any
    environment {
        AWS_ACCOUNT_ID="233181867717"
        AWS_DEFAULT_REGION="us-east-1"
        IMAGE_REPO_NAME="web-ecr"
        REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
        SERVICE_NAME="kube-news"
        TASK_FAMILY="web-task"
    }
   
    stages {
        
         stage('Logging into AWS ECR') {
            steps {
                script {
                sh "aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
                }
                 
            }
        }
        

    // Building Docker images
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build "${REPOSITORY_URI}:${env.BUILD_ID}"
        }
      }
    }
   
    // Uploading Docker images into AWS ECR
    stage('Pushing to ECR') {
     steps{  
         script {
                sh "docker tag ${IMAGE_REPO_NAME}:${env.BUILD_ID} ${REPOSITORY_URI}:latest"
                sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${env.BUILD_ID}"
                sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:latest"

         }
        }
      }
    stage('Changing the ECS') {
     steps{  
         script {
                aws ecs update-service --cluster web-ecs --service kube-news-service --force-new-deployment --region us-east-1
         }
        }
      }
    }
}
