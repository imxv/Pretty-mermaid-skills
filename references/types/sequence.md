# Sequence Diagram

## Basic Syntax
```mermaid
sequenceDiagram
    participant A as Alice
    participant B as Bob

    A->>B: Hello Bob
    B-->>A: Hi Alice
    Note right of B: Bob is thinking
    A->>B: Another message
```

## Participants
```mermaid
sequenceDiagram
    participant A
    actor B
    participant C
```

## Message Types
- `->>` - Solid line arrow
- `-->>` - Dotted line arrow
- `-x` - Solid line with cross
- `--x` - Dotted line with cross
- `-)` - Solid line with open arrow
- `--)` - Dotted line with open arrow

## Activations
```mermaid
sequenceDiagram
    A->>+B: Request
    B-->>-A: Response
```

## Notes
```mermaid
sequenceDiagram
    Note left of A: Note on left
    Note right of B: Note on right
    Note over A,B: Note spanning both
```

## Loops & Alt
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

## Best Practices
- Use meaningful participant names
- Add notes for complex logic
- Keep sequence linear (avoid too many branches)
- Use activations to show processing time
- Limit to 5-7 participants for clarity
