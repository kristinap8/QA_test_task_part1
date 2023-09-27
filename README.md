## Implementation of the first part of a test task.

Every test case was passed except for the last one. Here is a description of this bug.

### Bug: The checkout process proceeds even with an empty cart.

**Reproduction Steps:**
1. The user is located on the cart page.
2. The cart page is empty.
3. The user clicks the "Checkout" button.

**Expected Behavior:**
- The user should not be redirected to another page.
- The user should receive an error message "Cart is empty."

**Actual Behavior:**
- The user is redirected to the checkout page.