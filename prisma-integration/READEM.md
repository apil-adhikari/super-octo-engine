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
