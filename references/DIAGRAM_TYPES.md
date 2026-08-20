# Mermaid Diagram Types Reference

## Contents

- [Flowchart / Graph](#flowchart--graph)
- [Sequence Diagram](#sequence-diagram)
- [State Diagram](#state-diagram)
- [Class Diagram](#class-diagram)
- [ER Diagram](#er-diagram)
- [XY Chart](#xy-chart)
- [General Best Practices](#general-best-practices)

## Flowchart / Graph

### Basic Syntax
```mermaid
flowchart LR
    A[Node] --> B[Another Node]
    B --> C{Decision}
    C -->|Yes| D[Result 1]
    C -->|No| E[Result 2]
```

### Node Shapes
- `[Text]` - Rectangle
- `([Text])` - Stadium (rounded)
- `[[Text]]` - Subroutine (double border)
- `[(Text)]` - Cylindrical (database)
- `((Text))` - Circle
- `>Text]` - Asymmetric shape
- `{Text}` - Rhombus (decision)
- `{{Text}}` - Hexagon
- `[/Text/]` - Parallelogram
- `[\Text\]` - Trapezoid (alt)

### Connections
- `-->` - Arrow
- `---` - Line
- `-.->` - Dotted arrow
- `==>` - Thick arrow
- `--text-->` - Arrow with text
- `-->|text|` - Arrow with text (alt syntax)

### Edge Styling
```mermaid
flowchart LR
    A --> B
    B --> C
    linkStyle 0 stroke:#7aa2f7,stroke-width:3px
```

`linkStyle` works in flowcharts and state diagrams. Target an edge by its zero-based declaration order, or use `linkStyle default` for all edges.

### Direction
- `LR` - Left to Right
- `RL` - Right to Left
- `TB` / `TD` - Top to Bottom / Top Down
- `BT` - Bottom to Top

### Best Practices
- Use `LR` direction for wide screens
- Keep decision nodes distinct with `{}` shape
- Use stadium shapes `([])` for start/end
- Limit nesting depth to 3 levels
- Group related nodes visually

---

## Sequence Diagram

### Basic Syntax
```mermaid
sequenceDiagram
    participant A as Alice
    participant B as Bob

    A->>B: Hello Bob
    B-->>A: Hi Alice
    Note right of B: Bob is thinking
    A->>B: Another message
```

### Participants
```mermaid
sequenceDiagram
    participant A
    actor B
    participant C
```

### Message Types
- `->>` - Solid line arrow
- `-->>` - Dotted line arrow
- `-x` - Solid line with cross
- `--x` - Dotted line with cross
- `-)` - Solid line with open arrow
- `--)` - Dotted line with open arrow

### Activations
```mermaid
sequenceDiagram
    A->>+B: Request
    B-->>-A: Response
```

### Notes
```mermaid
sequenceDiagram
    Note left of A: Note on left
    Note right of B: Note on right
    Note over A,B: Note spanning both
```

### Loops & Alt
```mermaid
sequenceDiagram
    loop Every minute
        A->>B: Ping
    end

    alt Success
        B-->>A: OK
    else Failure
        B-->>A: Error
    end
```

### Best Practices
- Use meaningful participant names
- Add notes for complex logic
- Keep sequence linear (avoid too many branches)
- Use activations to show processing time
- Limit to 5-7 participants for clarity

---

## State Diagram

### Basic Syntax
```mermaid
stateDiagram-v2
    [*] --> State1
    State1 --> State2: Transition
    State2 --> [*]
```

### Composite States
```mermaid
stateDiagram-v2
    [*] --> Active

    state Active {
        [*] --> Running
        Running --> Paused
        Paused --> Running
        Running --> [*]
    }

    Active --> [*]
```

### Choice
```mermaid
stateDiagram-v2
    state if_state <<choice>>
    [*] --> if_state
    if_state --> State1: condition 1
    if_state --> State2: condition 2
```

### Concurrency
```mermaid
stateDiagram-v2
    [*] --> Active

    state Active {
        [*] --> Process1
        --
        [*] --> Process2
    }
```

### Notes
```mermaid
stateDiagram-v2
    State1 --> State2
    note right of State1
        Important note here
    end note
```

### Best Practices
- Start with `[*]` for initial state
- Use clear transition labels
- Limit composite state depth to 2 levels
- Group related states together
- Use choice nodes for complex branching
- State names and transition labels may contain Chinese, Japanese, Korean, and other Unicode text

---

## Class Diagram

### Basic Syntax
```mermaid
classDiagram
    class ClassName {
        +String publicField
        -int privateField
        #bool protectedField
        ~String packageField

        +publicMethod()
        -privateMethod()
        #protectedMethod()
        ~packageMethod()
    }
```

### Visibility
- `+` Public
- `-` Private
- `#` Protected
- `~` Package/Internal

### Relationships
```mermaid
classDiagram
    ClassA --|> ClassB : Inheritance
    ClassC --* ClassD : Composition
    ClassE --o ClassF : Aggregation
    ClassG --> ClassH : Association
    ClassI -- ClassJ : Link (solid)
    ClassK ..> ClassL : Dependency
    ClassM ..|> ClassN : Realization
```

### Cardinality
```mermaid
classDiagram
    Customer "1" --> "*" Order
    Order "1" --> "1..*" OrderItem
```

### Abstract & Interface
```mermaid
classDiagram
    class AbstractClass {
        <<abstract>>
        +abstractMethod()*
    }

    class Interface {
        <<interface>>
        +method()
    }
```

### Best Practices
- Show only relevant attributes/methods
- Use inheritance sparingly
- Indicate cardinality on associations
- Group related classes visually
- Use interfaces for contracts

---

## ER Diagram

### Basic Syntax
```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ ORDER_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : "ordered in"
```

### Cardinality
- `||--||` - One to one
- `}o--o{` - Zero or more to zero or more
- `||--o{` - One to zero or more
- `}o--||` - Zero or more to one
- `||--|{` - One to one or more
- `}|--|{` - One or more to one or more

### Attributes
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

### Attribute Types
- Use standard SQL types: `string`, `int`, `decimal`, `date`, `bool`
- Add constraints: `PK` (Primary Key), `FK` (Foreign Key), `UK` (Unique Key)

### Best Practices
- Use UPPERCASE for entity names
- Use snake_case for attribute names
- Always mark PK and FK
- Show only essential attributes
- Keep relationship labels clear
- Limit to 6-8 entities per diagram

---

## XY Chart

### Bar and Line Series
```mermaid
xychart-beta
    title "Monthly Revenue"
    x-axis [Jan, Feb, Mar, Apr, May, Jun]
    y-axis "Revenue" 0 --> 7000
    bar [3200, 4100, 3800, 5200, 4900, 6100]
    line [3000, 3700, 4200, 4600, 5300, 5900]
```

### Horizontal Charts
```mermaid
xychart-beta horizontal
    title "Language Popularity"
    x-axis [Python, JavaScript, Java, Go, Rust]
    bar [30, 25, 20, 12, 8]
```

### Axis Configuration
- Categorical axis: `x-axis [A, B, C]`
- Numeric range: `x-axis 0 --> 100`
- Axis title: `y-axis "Score" 0 --> 100`
- Add multiple `bar` or `line` declarations for multi-series charts
- Pass `--interactive` when rendering SVG to enable hover tooltips

### Best Practices
- Keep category labels short enough to avoid crowding
- Set an explicit numeric range when series must be compared consistently
- Use a combined bar and line chart only when the two series share a meaningful scale
- Prefer ASCII output with `--color-mode none` for logs and stable snapshots

---

## General Best Practices

### Theming
- Use `tokyo-night` for dark mode documentation
- Use `github-light` for light mode documentation
- Use `dracula` for vibrant, colorful diagrams
- Use `monokai` for code-centric diagrams

### Performance
- Keep diagrams under 50 nodes for fast rendering
- Split complex diagrams into multiple files
- Use batch rendering for multiple diagrams

### Accessibility
- Add meaningful labels to all connections
- Use high-contrast themes
- Avoid relying solely on color to convey information
- Provide text descriptions for complex diagrams

### File Organization
```
diagrams/
├── architecture/
│   ├── system-overview.mmd
│   └── data-flow.mmd
├── workflows/
│   ├── user-registration.mmd
│   └── checkout-process.mmd
└── database/
    ├── schema-users.mmd
    └── schema-orders.mmd
```
