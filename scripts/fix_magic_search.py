path = "components/MagicAiSearchSection.tsx"
lines = open(path, encoding="utf-8").read().splitlines()
# Line 109 (index 108) closes magic-search-inner (a plain div).
lines[108] = "      </div>"
open(path, "w", encoding="utf-8").write("\n".join(lines) + "\n")
print("fixed:", repr(lines[108]))
