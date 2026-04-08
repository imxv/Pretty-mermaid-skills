# ZenUML

> **Note:** ZenUML is an alternative syntax for Sequence diagrams that focuses on a more programming-like structure.

## Basic Syntax
```mermaid
zenuml
    title Basic Example
    Alice->John: Hello John, how are you?
    John->Alice: Great!
    Alice->John: See you later!
```

## Method Calls & Logic
ZenUML shines when modeling code-like behavior, including conditions, try/catch, and returns.

```mermaid
zenuml
    BookLibService.Borrow(id) {
      User = Session.GetUser()
      if(User.isActive) {
        try {
          BookRepository.Update(id, onLoan, User)
          receipt = new Receipt(id, dueDate)
        } catch (BookNotFoundException) {
          ErrorService.onException()
        } finally {
          Connection.close()
        }
      }
      return receipt
    }
```

## Parallel Actions
Use the `par` block for concurrent actions.

```mermaid
zenuml
    title Parallel Actions
    par {
        Alice->Bob: Notify Group
        Alice->John: Notify Group
        Alice->Mary: Notify Group
    }
```

## Best Practices
- Use ZenUML instead of standard `sequenceDiagram` when the interaction closely mirrors actual source code
- Take advantage of `{}` blocks to show execution context
- Participants are created implicitly based on their first appearance
