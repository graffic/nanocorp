#!/usr/bin/env bash
#
# Based on https://blog.kiloreux.me/2018/05/19/deploy-to-kubernetes-from-travis/

set -o pipefail
set -o errexit
set -o nounset

cd "$(cd "$(dirname "$0")"; pwd)"

# Prepare k8s keys
openssl aes-256-cbc -K $encrypted_d6c310cbd15d_key -iv $encrypted_d6c310cbd15d_iv -in gke_user_token.enc -out gke_user_token -d
openssl aes-256-cbc -K $encrypted_d6c310cbd15d_key -iv $encrypted_d6c310cbd15d_iv -in ca.crt.enc -d | base64 --decode > ca.crt

kubectl config set-cluster k8s-cluster --embed-certs=true --server=${GKE_ENDPOINT} --certificate-authority=ca.crt
kubectl config set-credentials travis-echo --token=$(cat gke_user_token)
kubectl config set-context travis --cluster=k8s-cluster --user=travis-deploy
kubectl config use-context travis
kubectl config current-context

kubectl apply -f config.yml
