# Admin Product Management – E-Commerce Frontend

This project is a production-oriented **Admin Panel** for managing products in a retail / e-commerce system.  
It is built with **React + TypeScript + Redux Toolkit + RTK Query** and is designed to demonstrate:

- Scalable state management
- Clean feature-based architecture
- Real-world patterns such as:
  - Recursive category trees
  - Optimistic concurrency control
  - Inline editing
  - File upload with validation
  - Server-driven caching & invalidation

---
## 🧪 Evaluation Criteria Mapping
### 1. Project Structure
      src/
      ├─ app/ # Store, router, global setup
      ├─ features/
      │ ├─ products/ # Product domain (API + types)
      │ ├─ categories/ # Category tree (recursive UI)
      │ └─ variants/ # Variant & stock management
      ├─ components/ # Shared UI (ImageUploader, etc.)
      └─ pages/
      └─ Products/ # Screens (List, Detail)

   Each domain is isolated by **feature**, not by technical layer.  
   This keeps the codebase scalable when the system grows.

### 2. UI Layout

The UI is built as a **real admin tool**, not a demo page:

- Table-based product list
- Inline editing for fast operations
- Dedicated Product Detail screen
- Recursive tree view for categories
- Form-style layout for variants and uploads

Design principles:

- Information density over decoration
- Clear hierarchy (list → detail → sub-entities)
- Fast feedback for user actions (inline updates, error messages)
- Components are small and focused (`CategoryNode`, `ImageUploader`, etc.)

Styling is done with **Tailwind CSS** to:

- Avoid large UI frameworks overhead
- Keep styles close to components
- Enable rapid layout iteration

### 3. Technology Stack Components

| Concern            | Technology Used            | Reason |
|--------------------|----------------------------|--------|
| UI Framework       | React + TypeScript         | Type safety, component model |
| State Management   | Redux Toolkit              | Predictable global state |
| API Client         | RTK Query                  | Caching, invalidation, async handling |
| Styling            | Tailwind CSS               | Lightweight, utility-first |
| File Upload        | Native `FormData` + RTK    | No heavy dependencies |
| Routing            | React Router               | SPA navigation |

RTK Query is used as the **single source of truth for server state**:

- No manual reducers for API data
- Automatic caching and refetching
- Tag-based invalidation

### 4. API and Data Handling
1.  Key Principles
    - No component talks to `fetch` directly  
    - All server data flows through **RTK Query**  
    - Components remain **declarative**  
  
1. 🛡️ Input Validation
   Client-side checks for:
   - Image type & size  
   - Required fields  
1. ⚠️ Error Handling & Resilience
   Server errors are handled gracefully:
   - `409 Conflict` → domain-specific message  
   - Network errors → generic fallback 
   - UI never crashes due to API inconsistency 

### 5. ⚡ Performance Considerations
   The project applies several performance-oriented practices:
   - RTK Query caching prevents duplicate requests  
   - Tag-based invalidation avoids full refetches  
   - Components re-render only when necessary  
   - Feature-based structure enables future code splitting  
   - Minimal UI framework footprint (Tailwind instead of heavy UI libs)  

Prepared for further optimization:

- Lazy loading routes:

```ts
const ProductDetail = lazy(() => import('./ProductDetail'));
```
- Code splitting by feature
- Pagination for large datasets
- Progressive enhancement for file uploads
---

## 🔄 State Management Strategy

We use:

- **Redux Toolkit** – predictable global state
- **RTK Query** – server state management

Why RTK Query:

- Built-in caching
- Automatic request deduplication
- Tag-based invalidation
- Simplified async logic
- No need for manual reducers for API state

All API communication goes through:

```ts
src/store/apiSlice.ts
```

Each feature injects its own endpoints:
```ts
productsApi = api.injectEndpoints(...)
categoriesApi = api.injectEndpoints(...)
variantsApi = api.injectEndpoints(...)
```

This allows the system to scale horizontally by feature.

---

## 📦 Features

1. **Products**
   - List products with pagination  
   - Create / Update / Soft delete  
   - Navigate to product detail  

2. **Categories (Recursive Tree)**
   - Load category tree from API  
   - Render using recursive components  
   - Support hierarchical structure  

3. **Variants & Optimistic Concurrency**
   - Each product contains multiple variants  
   - Stock management uses optimistic locking  

4. **Image Upload**
   - Upload product image  
   - Client-side validation:  
     - Type: PNG / JPG  
     - Size: < 2MB  
   - Preview before upload  
   - Uses `multipart/form-data`  

---

## 🎯 Design Principles

1. **Feature-first structure**

1. **API-driven UI**

1. **No local duplication of server state**

1. **Minimal side-effects in components**

1. **Clear separation between**:
   - UI
   - Domain logic
   - Data fetching

---

## 🚀 Why This Design

This project intentionally goes beyond a typical **“CRUD demo”**:

| Typical CRUD      | This Project                |
|-------------------|-----------------------------|
| Flat list         | Recursive category tree     |
| Simple update     | Optimistic concurrency      |
| Basic form        | Inline editing              |
| No media          | File upload                 |
| Local state       | RTK Query cache             |

It demonstrates readiness for:

- Large-scale systems  
- Multi-user environments  
- Real production constraints  

---

## 🐳 Run Frontend with Docker

```bash
docker compose up --build
```
The UI will be available at: http://localhost:5173

It connects to the backend via:
      VITE_API_BASE_URL=http://localhost:8080

---

## 🔮 Propose the Future Improvements

Although this project already demonstrates a production-grade front-end architecture, it is intentionally scoped for an assessment. In a real-world system, the following improvements would be natural next steps:

### 1. Authentication & Authorization

- Integrate JWT-based authentication
- Role-based UI rendering (Admin / Editor / Viewer)
- Protected routes using route guards
- Token refresh & session persistence

This aligns with how real admin systems restrict access to sensitive operations such as product deletion or stock updates.

### 2. Advanced Form Handling

- Introduce `react-hook-form` + schema validation (Zod/Yup)
- Field-level validation messages
- Better UX for complex forms (variants, attributes, categories)

This reduces boilerplate and improves correctness for large-scale forms.

### 3. Improved Search & Filtering

- Integrate with backend search (Elasticsearch / OpenSearch)
- Client-side filters:
  - Category
  - Price range
  - Status
- Debounced search input

This would allow the admin panel to scale to thousands of products without degrading usability.

### 4. Observability & Monitoring

- Centralized error tracking (Sentry)
- Performance monitoring (Web Vitals)
- Structured logging for user actions

These features are essential in production admin tools to detect issues early.

### 7. Resilience Enhancements

- Optimistic UI updates
- Retry strategies for failed mutations

This improves reliability in unstable network environments.