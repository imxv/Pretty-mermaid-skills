# Architecture Diagram

> **Note:** Architecture diagram is currently experimental (architecture-beta).

## Basic Syntax
```mermaid
architecture-beta
    group api(cloud)[API]

    service db(database)[Database] in api
    service server(server)[Server] in api

    db:L -- R:server
```

## Groups and Services
- `group {id}({icon})[{title}]` - Creates a group boundary
- `service {id}({icon})[{title}] (in {group_id})?` - Creates a service node

## Connections & Direction
```mermaid
architecture-beta
    service disk1(disk)[Storage]
    service disk2(disk)[Storage]
    service server(server)[Server]
    
    %% T:Top, B:Bottom, L:Left, R:Right
    disk1:T -- B:server
    disk2:R -- L:disk1
```

## Junctions (Routing)
```mermaid
architecture-beta
    service left_disk(disk)[Disk]
    service right_gateway(internet)[Gateway]
    
    junction junctionCenter

    left_disk:R -- L:junctionCenter
    junctionCenter:R -- L:right_gateway
```

## Best Practices
- Use meaningful icons (`cloud`, `database`, `server`, `disk`, `internet`)
- Group related services together using `in`
- Use junctions for complex multi-directional routing
