# Class Diagram

## Basic Syntax
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

## Visibility
- `+` Public
- `-` Private
- `#` Protected
- `~` Package/Internal

## Relationships
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

## Cardinality
```mermaid
classDiagram
    Customer "1" --> "*" Order
    Order "1" --> "1..*" OrderItem
```

## Abstract & Interface
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

## Best Practices
- Show only relevant attributes/methods
- Use inheritance sparingly
- Indicate cardinality on associations
- Group related classes visually
- Use interfaces for contracts
