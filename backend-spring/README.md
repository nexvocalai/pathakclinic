# Pathak Homoeopathic Clinic Backend

Spring Boot 3 / Java 17 backend for the existing Next.js frontend admin panel.

## Run

```bash
mvn spring-boot:run
```

The default profile uses the Supabase PostgreSQL configuration in `src/main/resources/application-supabase.yml`.

To run with the old local H2 database instead:

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

For another PostgreSQL database:

```bash
set SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/pathak_clinic
set SPRING_DATASOURCE_USERNAME=postgres
set SPRING_DATASOURCE_PASSWORD=postgres
set SPRING_DATASOURCE_DRIVER=org.postgresql.Driver
mvn spring-boot:run
```

## Supabase Database

Run [supabase_schema.sql](supabase_schema.sql) in the Supabase SQL Editor, then run [supabase_import_data.sql](supabase_import_data.sql) to import the current H2 data.

Start the backend with:

```bash
mvn spring-boot:run
```

The Supabase profile is configured in `src/main/resources/application-supabase.yml` and is active by default unless `SPRING_PROFILES_ACTIVE` is set.

Default admin login:

```text
email: doctor@pathak.com
password: password123
```

Frontend API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## Swagger

After the backend starts, open:

```text
http://localhost:8080/swagger-ui.html
```

OpenAPI JSON is available at:

```text
http://localhost:8080/api-docs
```

For protected admin APIs, first call `/api/auth/login`, copy the returned token, click **Authorize** in Swagger UI, and enter:

```text
Bearer your_token_here
```
