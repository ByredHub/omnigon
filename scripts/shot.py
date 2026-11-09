import sys
from playwright.sync_api import sync_playwright

lang = sys.argv[1] if len(sys.argv) > 1 else "ru"
width = int(sys.argv[2]) if len(sys.argv) > 2 else 375

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": width, "height": 812}, device_scale_factor=2, is_mobile=True, has_touch=True)
    page = ctx.new_page()
    errors = []
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.goto(f"http://localhost:3000/{lang}", wait_until="networkidle")
    # scroll through to trigger reveals
    h = page.evaluate("document.body.scrollHeight")
    for y in range(0, h, 400):
        page.evaluate(f"window.scrollTo({{top:{y},behavior:'instant'}})")
        page.wait_for_timeout(250)
    page.evaluate("window.scrollTo(0,0)")
    page.wait_for_timeout(600)
    sw = page.evaluate("document.documentElement.scrollWidth")
    cw = page.evaluate("document.documentElement.clientWidth")
    print(f"{lang}@{width}: scrollWidth={sw} clientWidth={cw} overflow={'YES' if sw > cw else 'no'} errors={len(errors)}")
    for e in errors[:5]:
        print("  ERR:", e[:200])
    # overflowing elements
    offenders = page.evaluate("""() => {
      const cw = document.documentElement.clientWidth; const out=[];
      document.querySelectorAll('body *').forEach(el=>{const r=el.getBoundingClientRect(); if(r.right>cw+1||r.left<-1){out.push(el.tagName+'.'+String(el.className).slice(0,60)+' right='+Math.round(r.right)+' left='+Math.round(r.left))}});
      return out.slice(0,12);
    }""")
    for o in offenders:
        print("  OVF:", o)
    page.screenshot(path=f"../shot-{lang}-{width}.png", full_page=True)
    b.close()
