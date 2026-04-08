# Mindmap

> **Note:** Mindmaps rely entirely on indentation to establish hierarchy.

## Basic Syntax
```mermaid
mindmap
    Root Node
        Child 1
            Grandchild 1.1
            Grandchild 1.2
        Child 2
            Grandchild 2.1
```

## Node Shapes
Shapes are defined by the brackets used around the text (similar to Flowcharts).

```mermaid
mindmap
    root((Central Idea))
        id1[Square]
        id2(Rounded)
        id3((Circle))
        id4))Bang((
        id5{{Hexagon}}
```

## Markdown Formatting & Multi-line
You can use standard markdown inside nodes by wrapping the text in <code>"\`markdown\`"</code>.

```mermaid
mindmap
    root["`**Project Plan**
    *Q3 2024*`"]
        tech["`**Tech Stack**
        - React
        - Node.js`"]
        team["`**Team**
        1. Alice
        2. Bob`"]
```

## Best Practices
- Ensure consistent indentation (spaces or tabs, but don't mix them within the same mindmap)
- Keep node text concise
- Use markdown blocks ```"`...`"``` for lists or multi-line text instead of making the mindmap too deep
