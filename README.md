# K8s Microservices Demo

Jednoduchá aplikácia s dvoma Node.js mikro-servisami nasadenými na Kubernetes.

## Architektúra

┌─────────────┐

│ API Gateway │ (port 3000)

└──────┬──────┘

│

└─────────────────┐

│

┌──────▼──────┐

│ User Service │ (port 3001)

└──────┬──────┘

│

┌──────▼──────┐

│ PostgreSQL │

└──────────────┘

## Komponenty

- **api-gateway**: REST API, komunikuje s user-service
- **user-service**: CRUD operácie na user entitách
- **Health checks**: Liveness a readiness probes na oboch servisoch

## Spustenie lokálne

```bash
minikube start --driver=docker
eval $(minikube docker-env)

# Build images
docker build -t user-service:1.0 services/user-service/
docker build -t api-gateway:1.0 services/api-gateway/

# Deploy
kubectl apply -f k8s/

# Port forward
kubectl port-forward svc/api-gateway 3000:3000
```

## Test

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/users
curl http://localhost:3000/api/users/1
```

## Kubernetes features

- Deployments s health checks (liveness + readiness probes)
- Services (ClusterIP) pre inter-service komunikáciu
- Resource limits a requests
- Ingress pre external access
- GitHub Actions CI/CD pipeline

## K8s príkazy

```bash
kubectl get pods
kubectl get svc
kubectl logs -f deployment/api-gateway
kubectl describe pod <pod-name>
kubectl port-forward svc/api-gateway 3000:3000
```
