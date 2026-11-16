# Market Intelligence Terminal (Hybrid Live + Snapshot Fallback)

Zero-build frontend for the local `market_context.py` server:

- **Online (Laptop Awake):** Connects to the configured backend server (`http://127.0.0.1:5090` locally, or your Cloudflare Tunnel / Tailscale HTTPS URL via `?backend=https://...` or the **Server** button) and streams the live interactive terminal.
- **Offline (Laptop Asleep / Unreachable):** Automatically falls back to the latest `PRE_OPEN` / `POST_CLOSE` watchlist HTML snapshots under `snapshots/` built directly from the local `market_context.py` snapshot engine.
