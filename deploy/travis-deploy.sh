#!/usr/bin/env bash
#
# Based on https://blog.kiloreux.me/2018/05/19/deploy-to-kubernetes-from-travis/

set -o pipefail
set -o errexit
set -o nounset

cd "$(cd "$(dirname "$0")"; pwd)"

echo "Prepare secrets..."
openssl aes-256-cbc -K $encrypted_4e81e2b6d12b_key -iv $encrypted_4e81e2b6d12b_iv -in secrets.tar.enc -out secrets.tar -d
tar xvf secrets.tar

echo "Configure kubectl..."
kubectl config set-cluster k8s-cluster --embed-certs=true --server=${GKE_ENDPOINT} --certificate-authority=ca.crt
kubectl config set-credentials travis-echo --token=$(cat gke_user_token)
kubectl config set-context travis --cluster=k8s-cluster --user=travis-deploy
kubectl config use-context travis
kubectl config current-context

echo "Deploy..."
kubectl apply -f config.yml
