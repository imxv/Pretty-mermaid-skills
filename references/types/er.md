# ER Diagram

## Basic Syntax
```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ ORDER_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : "ordered in"
```

## Cardinality
- `||--||` - One to one
- `}o--o{` - Zero or more to zero or more
- `||--o{` - One to zero or more
- `}o--||` - Zero or more to one
- `||--|{` - One to one or more
- `}|--|{` - One or more to one or more

## Attributes
```mermaid
erDiagram
    CUSTOMER {
        string id PK
        string name
        string email UK
        date created_at
    }

    ORDER {
        string id PK
        string customer_id FK
        decimal total
        date order_date
    }
```

## Attribute Types
- Use standard SQL types: `string`, `int`, `decimal`, `date`, `bool`
- Add constraints: `PK` (Primary Key), `FK` (Foreign Key), `UK` (Unique Key)

## Best Practices
- Use UPPERCASE for entity names
- Use snake_case for attribute names
- Always mark PK and FK
- Show only essential attributes
- Keep relationship labels clear
- Limit to 6-8 entities per diagram
