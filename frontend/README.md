# VR360 Frontend

Vue 3 admin frontend for the VR360 Django backend.

## Setup

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

Open:

```text
http://127.0.0.1:5173
```

## Environment

Create `.env` from `.env.example` when you need to change the backend URL:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## Screens

- Login with JWT
- Dashboard overview
- Projects list and create project
- Locations CRUD
- Tour versions CRUD, preview and export
- VR360 Builder with scenes, panorama upload and hotspot editing
- Media panorama upload and processing status
- Publishing config and whitelist domains
- Analytics by location
- Public viewer loader and visit tracking

## Builder Flow

1. Create a project.
2. Create a location.
3. Create a draft tour version with at least one scene.
4. Open `VR360 Builder`.
5. Select project, location and draft version.
6. Add scenes, upload panorama images, click the canvas to add hotspots.
7. Save the tour to update `TourVersion.data`.
