# URL Shortener - Architecture Document

> This document explains the architectural decisions taken while building the URL Shortener project. It serves as both project documentation and a record of engineering decisions.

---

# Project Goal

Build a production-grade URL shortening service capable of handling:

- 1 Billion stored URLs
- 100 Million requests/day
- Low latency
- High availability
- Horizontal scalability

The project starts as a monolith and gradually evolves into a distributed microservice architecture.

---

# Why This Project?

The goal is not simply to shorten URLs.

This project demonstrates practical knowledge of:

- REST API Design
- Distributed Systems
- Caching
- Database Design
- Horizontal Scaling
- Docker
- Kubernetes
- Monitoring
- Event-Driven Architecture
- Production Backend Development

---

# Overall Roadmap

```text
Monolith
      │
      ▼
Redis Cache
      │
      ▼
Background Worker
      │
      ▼
Microservices
      │
      ▼
API Gateway
      │
      ▼
Kafka
      │
      ▼
Kubernetes
```

Every phase should result in a working application.

---

# Technology Stack

| Component        | Technology           | Why?                                     |
| ---------------- | -------------------- | ---------------------------------------- |
| Runtime          | Node.js              | Excellent asynchronous performance       |
| Language         | TypeScript           | Strong typing and maintainability        |
| Framework        | Fastify              | High performance with low overhead       |
| Database         | PostgreSQL           | ACID compliance and strong indexing      |
| Cache            | Redis                | Extremely fast in-memory data store      |
| Package Manager  | pnpm                 | Fast, disk-efficient, workspace support  |
| Containerization | Docker               | Consistent development environment       |
| Monitoring       | Prometheus + Grafana | Industry-standard metrics and dashboards |
| Queue (Later)    | Kafka / RabbitMQ     | Reliable asynchronous processing         |

---

# Repository Structure

```text
url-shortener/

apps/
    url-service/

packages/
    shared/

infra/
    docker/
    k8s/

docs/

scripts/
```

---

# Why a Monorepo?

Instead of multiple repositories, all services live inside a single repository.

Advantages

- Shared utilities
- Shared types
- Shared ESLint configuration
- Shared CI/CD
- Easier refactoring
- Better dependency management

As the project grows:

```text
apps/

url-service/

gateway/

redirect-service/

analytics-worker/
```

can be added without changing the overall structure.

---

# Why pnpm?

Instead of npm or Yarn.

Reasons

- Faster installation
- Efficient disk usage
- Excellent workspace support
- Ideal for microservice architectures

---

# Why Fastify?

Fastify was chosen over Express.

Advantages

- Higher throughput
- Lower memory consumption
- Built-in JSON Schema validation
- Plugin-based architecture
- Excellent TypeScript support

---

# Why Plugin Architecture?

Instead of placing everything inside `server.ts`.

Bad

```text
server.ts

Database

Redis

Routes

Swagger

CORS

Logger

...
```

Good

```text
plugins/

env.ts

postgres.ts

redis.ts

swagger.ts

logger.ts

routes.ts
```

Each plugin has one responsibility.

Advantages

- Better organization
- Easier testing
- Reusable components
- Separation of concerns

---

# Why Environment Validation?

Instead of reading directly from `process.env`.

Bad

```ts
const port = process.env.PORT;
```

Problems

- Missing variables discovered at runtime
- No type safety
- Configuration spread throughout the project

Instead we use `@fastify/env`.

Benefits

- Startup validation
- Typed configuration
- Centralized configuration
- Fail-fast behavior

---

# Why Native ESM?

The project uses:

```json
{
  "type": "module"
}
```

with

```json
{
  "module": "NodeNext",
  "moduleResolution": "NodeNext"
}
```

This aligns with modern Node.js.

A consequence is that relative imports use the `.js` extension even though the source files are `.ts`.

Example

```ts
import { buildApp } from "./app.js";
```

During development, TypeScript resolves this to `app.ts`.

After compilation, the output becomes `app.js`, so Node.js can execute it without changing import paths.

---

# Why Build an App Factory?

Instead of

```ts
const app = Fastify();
```

we expose

```ts
buildApp();
```

Advantages

- Easier testing
- Better plugin registration
- Cleaner startup sequence
- Reusable Fastify instance

---

# Current Folder Structure

```text
src/

config/

plugins/

routes/

controllers/

services/

repositories/

middleware/

schemas/

types/

utils/

server.ts

app.ts
```

Each folder has a single responsibility.

---

# Design Principles

The project follows these principles:

- Single Responsibility Principle
- Separation of Concerns
- Dependency Injection through Fastify Plugins
- Fail Fast
- Stateless Services
- Configuration over Hardcoding
- Small, Testable Components

---

# Current Status

Completed

- pnpm Workspace
- Fastify
- TypeScript
- Environment Validation
- Plugin Architecture
- Typed Configuration

Next

- Docker Compose
- PostgreSQL
- Redis
- Health Checks
- Database Plugin
- Redis Plugin

---

# Future Architecture

```text
                    Internet
                        │
                 Load Balancer
                        │
                 API Gateway
                        │
          ┌─────────────┴─────────────┐
          │                           │
   Create URL Service        Redirect Service
          │                           │
          └─────────────┬─────────────┘
                        │
                  Redis Cluster
                        │
             PostgreSQL Primary
                        │
               PostgreSQL Replica
                        │
                  Kafka/RabbitMQ
                        │
                Analytics Worker
```

The system will evolve gradually, ensuring that every phase remains deployable and production-ready.
