# Sankey Diagram

> **Note:** Sankey diagrams represent flows from one set of values to another. This is an experimental feature in Mermaid.

## Basic Syntax
The syntax is based on raw CSV data with exactly 3 columns: `source,target,value`.

```mermaid
sankey
    %% source,target,value
    Electricity grid,Over generation / exports,104.453
    Electricity grid,Heating and cooling - homes,113.726
    Electricity grid,H2 conversion,27.14
```

## Advanced Configuration
You can configure the Sankey diagram using frontmatter to change visuals, hide values, or use gradient links.

```mermaid
---
config:
  sankey:
    showValues: false
    linkColor: gradient
    nodeAlignment: justify
---
sankey
    Source A,Node B,50
    Source A,Node C,20
    Node B,Final D,40
    Node B,Final E,10
    Node C,Final E,20
```

## Best Practices
- Data must be exactly three columns separated by commas
- Do not use spaces around commas unless they are part of the node name
- Use quotes `""` or `''` if node names contain commas
- Use `linkColor: gradient` in config for a more modern, blended look
