# Timeline

## Basic Syntax
```mermaid
timeline
    title History of Social Media
    2002 : LinkedIn
    2004 : Facebook
         : Google Orkut
    2005 : YouTube
    2006 : Twitter
```

## Grouping by Sections
Use the `section` keyword to group time periods and apply consistent styling.

```mermaid
timeline
    title Industrial Revolution
    section 17th-20th century
        Industry 1.0 : Machinery, Water power, Steam power
        Industry 2.0 : Electricity, Internal combustion engine
        Industry 3.0 : Electronics, Computers, Automation
    section 21st century
        Industry 4.0 : Internet, Robotics, IoT
        Industry 5.0 : Artificial intelligence, Big data
```

## Multi-level Events
You can chain colons to create sub-points under a single time period. Use `<br>` for explicit line breaks within text.

```mermaid
timeline
    title Product Roadmap
    section 2024 Q1
        Jan : Feature A : Sub-feature A1
            : Feature B
        Feb : Feature C : Sub-feature C1 : Sub-feature C2
```

## Best Practices
- Keep event descriptions short and punchy
- Group logical eras into `section`s
- If an event has multiple bullet points, chain them with colons rather than creating new lines
