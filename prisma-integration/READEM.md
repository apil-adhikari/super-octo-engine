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

---

Declaration Mergin: to add anything in the req.body because typescript doesnot allow us to directly create new data in req body

---

JUNE 1 2025:
Task 1: Image Upload
Recommended Popular Services:

     🌥️ Cloudinary (Highly recommended — easy setup + transformations)
     🗄️ Amazon S3

we upload image to cloudinary using multer -> we then save the image url generated in the database

     npm install multer cloudinary
     npm install --save-dev @types/multer

we need to get api keys & secrets from cloudinary

if we use multipart/form-data, we need a way to handle it

file upload -> file uploader middleware should take it and upload it to cloudinary and then it should return the url of the image so that it can be used on the controller to pass further

I need to do:
-create cloudinary config

---

- Update post
- If post deleted ->delete the cover too
- If updated ->delete the old cover & upload new image
