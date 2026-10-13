# Medo's apology page

This is a small local website served by the Python standard library. From the
Downloads folder, start it with:

```bash
python main.py
```

Then open <http://127.0.0.1:8000>. Stop the server with Ctrl+C.

## Customize the page

Edit `web/config.json` to change the apology, section text, gift label, footer,
photo paths, and photo descriptions. The portrait pictures in `web/photos/` are
`portrait-1.jpg` and `portrait-2.png`. The landscape pictures are
`landscape-1.jpg`, `landscape-2.webp`, `landscape-3.jpg`, and
`landscape-4.jpg`. If you replace a picture with a differently named file,
update its path in the `photos` object.

The gift animation is loaded only after the **View gift** button is pressed.
The scroll labels and section markers move through the three sections on the
same page.
