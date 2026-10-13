"""Serve Medo's configurable apology page from the local ``web`` folder."""

from __future__ import annotations

import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


WEB_ROOT = Path(__file__).resolve().parent / "web"


def main() -> None:
    parser = argparse.ArgumentParser(description="Run the apology page locally.")
    parser.add_argument("--host", default="127.0.0.1", help="Interface to bind (default: localhost only)")
    parser.add_argument("--port", type=int, default=8000, help="Port to serve on (default: 8000)")
    args = parser.parse_args()

    if not WEB_ROOT.is_dir():
        raise SystemExit(f"Web files are missing: {WEB_ROOT}")

    handler = partial(SimpleHTTPRequestHandler, directory=str(WEB_ROOT))
    server = ThreadingHTTPServer((args.host, args.port), handler)
    print(f"Apology page ready at http://{args.host}:{args.port}")
    print("Press Ctrl+C to stop the server.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
