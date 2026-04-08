# XY Chart

> **Note:** XY charts support bar and line series plotted on shared categorical or numerical axes.

## Basic Syntax
```mermaid
xychart
    title "Sales Revenue"
    x-axis [jan, feb, mar, apr, may, jun]
    y-axis "Revenue (in $)" 4000 --> 11000
    bar [5000, 6000, 7500, 8200, 9500, 10500]
    line [5000, 6000, 7500, 8200, 9500, 10500]
```

## Structure
- `xychart` - Starts the chart definition
- `title` - Optional chart title in quotes
- `x-axis` - Defines the X-axis (can be an array of categories `[a, b, c]` or a numeric range `min --> max`)
- `y-axis` - Defines the Y-axis (must be a numeric range `min --> max`)
- `bar` - Data points for a vertical bar series
- `line` - Data points for a line series

## Example: Numeric X-Axis
```mermaid
xychart
    title "Temperature over time"
    x-axis "Time (hours)" 0 --> 12
    y-axis "Temperature (C)" 10 --> 30
    line [15, 16, 18, 20, 22, 25, 27, 28, 27, 25, 22, 20, 18]
```

## Best Practices
- The length of data arrays (`bar` and `line`) must match the length of the `x-axis` categories or the implicit points on a numeric axis
- You can combine multiple `bar` and `line` series in the same chart
- Use clear labels with units (e.g., `"Revenue (in $)"`)
