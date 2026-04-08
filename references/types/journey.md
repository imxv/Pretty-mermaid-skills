# Journey Diagram

> **Note:** Journey diagrams are designed to map a user's experience over time.

## Basic Syntax
```mermaid
journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me
```

## Structure
- `title` - The overall diagram title
- `section` - A major phase or stage of the journey
- `task: score: actor1, actor2` - A specific step in the journey
  - **task** - Description of the action
  - **score** - A numerical value (1-5, or more) representing satisfaction/duration/effort
  - **actor(s)** - Comma-separated list of participants

## Example: Online Shopping
```mermaid
journey
    title Online Purchase Experience
    section Discovery
        Search for product: 4: Customer
        Compare prices: 3: Customer
        Read reviews: 5: Customer
    section Checkout
        Add to cart: 5: Customer
        Enter shipping info: 3: Customer
        Payment fails: 1: Customer, Bank API
        Retry payment: 4: Customer, Bank API
    section Delivery
        Receive confirmation: 5: Email System
        Track package: 4: Customer
        Package arrives: 5: Customer, Courier
```

## Best Practices
- Use a consistent scoring scale (e.g., 1-5 where 5 is high satisfaction)
- Identify all actors involved in each step
- Group related tasks into logical sections
