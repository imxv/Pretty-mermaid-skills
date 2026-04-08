# Git Graph

## Basic Syntax
```mermaid
gitGraph
   commit
   commit
   branch develop
   checkout develop
   commit
   commit
   checkout main
   merge develop
   commit
```

## Commits with IDs and Tags
```mermaid
gitGraph
    commit id:"v1.0" tag:"release"
    branch feature
    checkout feature
    commit id:"add-auth"
    commit id:"fix-bug" type: HIGHLIGHT
    checkout main
    merge feature
```

## Commit Types
- `commit` (Normal)
- `commit type: REVERSE` (Crossed out)
- `commit type: HIGHLIGHT` (Filled)

## Cherry Picking
```mermaid
gitGraph
    commit id: "ZERO"
    branch develop
    branch release
    commit id:"A"
    checkout main
    commit id:"ONE"
    checkout develop
    commit id:"B"
    checkout main
    merge develop id:"MERGE"
    checkout release
    cherry-pick id:"MERGE" parent:"B"
```

## Best Practices
- Keep branches logically named
- Use tags for important releases
- Use cherry-pick to show specific commit porting
- Don't overwhelm the graph with too many commits
