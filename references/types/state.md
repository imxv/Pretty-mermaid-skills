# State Diagram

## Basic Syntax
```mermaid
stateDiagram-v2
    [*] --> State1
    State1 --> State2: Transition
    State2 --> [*]
```

## Composite States
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

## Choice
```mermaid
stateDiagram-v2
    state if_state <<choice>>
    [*] --> if_state
    if_state --> State1: condition 1
    if_state --> State2: condition 2
```

## Concurrency
```mermaid
stateDiagram-v2
    [*] --> Active

    state Active {
        [*] --> Process1
        --
        [*] --> Process2
    }
```

## Notes
```mermaid
stateDiagram-v2
    State1 --> State2
    note right of State1
        Important note here
    end note
```

## Best Practices
- Start with `[*]` for initial state
- Use clear transition labels
- Limit composite state depth to 2 levels
- Group related states together
- Use choice nodes for complex branching
