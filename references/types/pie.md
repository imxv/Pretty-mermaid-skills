# Pie Chart

## Basic Syntax
```mermaid
pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
```

## Options
- `title` - Optional title for the pie chart
- `showData` - (Optional) Add this keyword after `pie` to render the actual data values next to the legend text.

```mermaid
pie showData
    title Netflix viewing habits
    "Time spent looking for movie" : 90
    "Time spent watching it" : 10
```

## Configuration
You can customize the text position relative to the pie slices.

```mermaid
%%{init: {"pie": {"textPosition": 0.5}}}%%
pie title Text Position 0.5
    "A" : 40
    "B" : 60
```
*(0.0 is center, 1.0 is edge)*

## Best Practices
- Data must be positive numeric values (supported up to two decimal places)
- Labels must be enclosed in quotes (`""`)
- Slices are rendered clockwise in the order they are defined
