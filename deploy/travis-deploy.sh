#!/usr/bin/env bash
#
# Based on https://medium.com/google-cloud/continuous-delivery-in-a-microservice-infrastructure-with-google-container-engine-docker-and-fb9772e81da7
set -o pipefail
set -o errexit
set -o nounset

DEPLOY_DIR="$(cd "$(dirname "$0")"; pwd)"
PATH=$DEPLOY_DIR:$PATH
cd $DEPLOY_DIR

echo "Prepare secrets..."
openssl aes-256-cbc -K $encrypted_4e81e2b6d12b_key -iv $encrypted_4e81e2b6d12b_iv -in travis-deploy.service-accout.json.enc -out travis-deploy.service-accout.json -d

echo "Install kubectl..."
rm -rf $HOME/google-cloud-sdk
export CLOUDSDK_CORE_DISABLE_PROMPTS=1
curl https://sdk.cloud.google.com | bash > /dev/null
source $HOME/google-cloud-sdk/path.bash.inc
gcloud --quiet version
gcloud --quiet components update
gcloud --quiet components update kubectl

echo "Configure kubectl..."
gcloud auth activate-service-account --key-file travis-deploy.service-accout.json
gcloud --quiet config set project bolibic
gcloud --quiet config set compute/region europe-west3
gcloud --quiet config set compute/zone europe-west3-a
gcloud container clusters get-credentials nanocorp

kubectl config current-context

echo "Deploy..."
kubectl apply -f config.yml
