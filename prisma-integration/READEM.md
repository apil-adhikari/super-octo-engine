### DAY

```
Incoming HTTP Request
     ↓
[ Server ]           ← Starts app and listens
     ↓
[ App ]              ← Express setup + route mounting
     ↓
[ Routes ]           ← "/api/users" mapped to userController methods
     ↓
[ Controllers ]      ← parse req.body, call userService, send response
     ↓
[ Services ]         ← business logic: validate, check business rules
     ↓
[ Models ]           ← Prisma queries (e.g., prisma.user.findMany())
     ↓
Database

```

✅ Update a User
✅ Create a User

TODO:
Delete a User

## Password Hashing

✅ Hash the password in the service layer, before saving to the database.
❌ Don't hash in the controller.
❌ Don't hash in middleware unless it's universally needed.
