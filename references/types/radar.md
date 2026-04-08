# Radar Chart

> **Note:** Radar diagrams are an experimental feature (`radar-beta`).

## Basic Syntax
```mermaid
radar-beta
  title "Student Grades"
  axis m["Math"], s["Science"], e["English"], h["History"]
  
  curve a["Alice"]{85, 90, 80, 70}
  curve b["Bob"]{70, 75, 85, 80}

  max 100
  min 0
```

## Structure
- `axis` - Defines the axes radiating from the center. You can define multiple axes on one line or split them across lines.
  - E.g., `axis id["Display Name"]`
- `curve` - Defines a data series (the filled polygon on the chart).
  - E.g., `curve id["Legend Name"]{val1, val2, ...}`
- `max` / `min` - Sets the scale bounds for all axes
- `showLegend` - `true` or `false` to toggle the legend
- `ticks` - Number of concentric grid lines (e.g., `ticks 5`)
- `graticule` - `polygon` or `circle` (default is `polygon`)

## Alternative Data Syntax
You can explicitly map values to specific axes instead of relying on the order.

```mermaid
radar-beta
  axis f["Feature Velocity"], s["Stability"], r["Resilience"]
  
  curve app1["App1"]{
    f 5, s 4.5, r 3.8
  }
  curve app2["App2"]{f 4, s 3, r 4}
  
  max 5
```

## Best Practices
- Explicitly map values to axes if the number of axes is large to avoid order mistakes
- Set explicit `min` and `max` values to ensure the scale is consistent and accurate
- Keep the number of curves small (2-4) to avoid the chart becoming unreadable
