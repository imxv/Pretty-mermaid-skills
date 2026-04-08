# Quadrant Chart

## Basic Syntax
```mermaid
quadrantChart
    title Reach and engagement of campaigns
    x-axis Low Reach --> High Reach
    y-axis Low Engagement --> High Engagement
    quadrant-1 We should expand
    quadrant-2 Need to promote
    quadrant-3 Re-evaluate
    quadrant-4 May be improved
    Campaign A: [0.3, 0.6]
    Campaign B: [0.45, 0.23]
```

## Structure
- `title` - (Optional) Title of the chart
- `x-axis` / `y-axis` - Labels for the axes. Use `-->` to define left/right or bottom/top labels
- `quadrant-1` to `quadrant-4` - Labels for the four quadrants (1 is top-right, 2 is top-left, 3 is bottom-left, 4 is bottom-right)
- `Point Name: [x, y]` - Data points where x and y are values between 0.0 and 1.0

## Styling Points
You can apply inline styling to individual points or use classes.

```mermaid
quadrantChart
    x-axis Low --> High
    y-axis Low --> High
    
    Point A: [0.8, 0.8] radius: 10, color: #ff0000
    Point B:::myClass: [0.2, 0.2]
    
    classDef myClass color: #00ff00, radius: 15
```

## Best Practices
- Keep quadrant text short (2-3 words)
- X and Y values *must* be between 0.0 and 1.0 (representing percentage along the axis)
- Use standard styling classes if you have many points to keep the code clean
