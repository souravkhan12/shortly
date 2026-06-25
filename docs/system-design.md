# 🚀 URL Shortener (Bit.ly Clone)

A production-grade URL shortening service capable of handling **1 Billion URLs** and **100 Million requests/day**.

## Tech Stack

- **Backend:** Node.js + Fastify
- **Database:** PostgreSQL
- **Cache:** Redis
- **Gateway:** Nginx
- **Containers:** Docker
- **Orchestration:** Kubernetes (Later)
- **Monitoring:** Prometheus + Grafana
- **Queue (Later):** Kafka / RabbitMQ
- **Load Testing:** k6

---

# System Requirements

## Functional Requirements

- Create short URLs
- Redirect using short URL
- Custom aliases
- URL expiration
- Analytics
- Delete URL
- Health endpoints

## Non-Functional Requirements

- Handle 100M requests/day
- Store 1B URLs
- Low latency
- High availability
- Horizontal scalability
- Fault tolerance
- Observability

---

# Overall Architecture (Final)

```text
                Internet
                    │
             Load Balancer
                    │
              Nginx Gateway
                    │
        ┌───────────┴───────────┐
        │                       │
 Create Service         Redirect Service
        │                       │
        └────────────┬──────────┘
                     │
                Redis Cluster
                     │
        ┌────────────┴────────────┐
        │                         │
 PostgreSQL Primary      PostgreSQL Replica
                     │
             Kafka / RabbitMQ
                     │
             Analytics Worker
```

---

# Phase 1 — Build the MVP (Monolith)

## Goal

Build a fully working URL shortener inside a single Node.js application.

Architecture:

```text
Client
   │
   ▼
Fastify API
   │
 ┌─┴────────┐
 │          │
Redis   PostgreSQL
```

---

## Folder Structure

```text
src/
├── config/
├── routes/
├── controllers/
├── services/
├── repositories/
├── cache/
├── middleware/
├── database/
├── utils/
└── app.ts
```

---

## Database

### PostgreSQL

Create table

```sql
urls

id BIGSERIAL
short_code VARCHAR UNIQUE
original_url TEXT
created_at
expires_at
click_count
```

Indexes

- short_code
- expires_at

---

## Redis Usage

Redis will store

```
url:abc123

↓

https://google.com
```

TTL

24 hours

---

## API Endpoints

### Create URL

```
POST /api/v1/url
```

Request

```json
{
  "url": "https://google.com"
}
```

Response

```json
{
  "shortUrl": "abc123"
}
```

---

### Redirect

```
GET /abc123
```

Flow

```
Redis

↓

Miss?

↓

Database

↓

Cache Result

↓

302 Redirect
```

---

### Analytics

```
GET /api/v1/analytics/:code
```

---

### Delete URL

```
DELETE /api/v1/url/:code
```

---

## Base62 Encoding

Generate IDs using

```
Redis INCR

↓

Base62 Encode
```

Never generate random strings.

Advantages

- No collisions
- Very fast
- Small URLs

---

## Redis Counter

Every redirect

```
INCR counter:abc123
```

Redis

```
counter:abc123 = 15000
```

Worker every minute

```
Read Counter

↓

Bulk UPDATE PostgreSQL

↓

Delete Counter
```

Never update PostgreSQL on every redirect.

---

## Features Checklist

- [ ] Docker
- [ ] Fastify
- [ ] PostgreSQL
- [ ] Redis
- [ ] Base62 Encoder
- [ ] URL Validation
- [ ] URL Creation
- [ ] Redirect
- [ ] Cache
- [ ] Redis Counter
- [ ] Background Worker
- [ ] Logging (Pino)
- [ ] Graceful Shutdown
- [ ] Health Endpoint
- [ ] Error Handling

---

## Deliverable

A single service capable of

- Creating URLs
- Redirecting
- Using Redis cache
- Collecting analytics
- Running inside Docker

---

# Phase 2 — Split into Microservices

Goal

Convert the monolith into independently scalable services.

Architecture

```text
              API Gateway

                  │

      ┌───────────┴────────────┐

      │                        │

 Create Service         Redirect Service
```

---

## Service 1

### Create Service

Responsibilities

- Validate URL
- Generate Base62 ID
- Store in PostgreSQL
- Store in Redis
- Return short URL

Endpoints

```
POST /api/v1/url
```

---

## Service 2

### Redirect Service

Responsibilities

- Redis Lookup
- PostgreSQL Lookup
- Cache Result
- Redirect
- Increment Analytics

Endpoint

```
GET /:code
```

---

## Service 3

### Analytics Worker

Responsibilities

Every minute

```
Read Redis Counters

↓

Bulk UPDATE PostgreSQL

↓

Delete Redis Counters
```

---

## API Gateway

Responsibilities

- Authentication
- Routing
- HTTPS
- Rate Limiting
- Logging
- Compression
- CORS

Recommended

- Nginx

---

## Docker Compose

Containers

```
gateway
create-service
redirect-service
analytics-worker
redis
postgres
```

---

## Features Checklist

- [ ] API Gateway
- [ ] Create Service
- [ ] Redirect Service
- [ ] Analytics Worker
- [ ] Docker Compose
- [ ] Shared Library
- [ ] Internal HTTP Communication
- [ ] Health Checks
- [ ] Structured Logging

---

## Deliverable

A fully working microservice architecture.

---

# Phase 3 — Production Features

## Redis Cluster

Move from a single Redis instance to Redis Cluster.

---

## PostgreSQL Read Replica

Redirect service reads from replicas.

Create service writes to primary.

---

## Message Queue

Replace Redis analytics counters with

```
Redirect

↓

Kafka / RabbitMQ

↓

Analytics Worker

↓

PostgreSQL
```

Benefits

- No data loss
- Event-driven architecture
- Better scalability

---

## Rate Limiting

Implement per-IP rate limiting using Redis.

Example

```
rate:192.168.1.10
```

---

## Monitoring

Install

- Prometheus
- Grafana

Track

- Cache hit ratio
- Redirect latency
- DB latency
- Requests/sec
- Error rate

---

## Load Testing

Use k6

Targets

- 1000+
- 5000+
- 10000 RPS

Measure

- P95 latency
- Throughput
- Cache hit ratio

---

## Features Checklist

- [ ] Kafka
- [ ] Read Replica
- [ ] Redis Cluster
- [ ] Prometheus
- [ ] Grafana
- [ ] Load Testing
- [ ] Retry Logic
- [ ] Circuit Breaker
- [ ] Distributed Logging

---

# Phase 4 — Kubernetes

Deploy

```
Gateway

↓

Create Service

↓

Redirect Service

↓

Analytics Worker

↓

Redis

↓

PostgreSQL
```

Implement

- Kubernetes Deployments
- Services
- Ingress
- ConfigMaps
- Secrets
- Horizontal Pod Autoscaler

---

# Future Improvements

- QR Code Generation
- User Accounts
- Authentication
- Custom Domains
- Password Protected URLs
- Geo Analytics
- Device Analytics
- Expiring Links
- Admin Dashboard
- Click Heatmaps

---

# Final Capacity

Target

- **Stored URLs:** 1 Billion
- **Requests/day:** 100 Million
- **Average RPS:** ~1157
- **Peak RPS:** 10K+

This roadmap takes the project from a simple MVP to a production-grade distributed system while keeping every phase deployable and testable.
