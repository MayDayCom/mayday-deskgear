"""Validate the two release assets and assemble the public Pages directory."""
import argparse
import hashlib
import json
from pathlib import Path
import re
import shutil
import struct

root = Path(__file__).resolve().parents[1]
files = root / "firmware"
app = (files / "firmware.bin").read_bytes()
factory = (files / "firmware.factory.bin").read_bytes()
pattern = rb"MAYDAY_PXL_META_V1\|board=jc3248w535\|version=(v\d+\.\d+[a-z0-9.]*)\|build=([^|]+)\|END"
records = re.findall(pattern, app)
if len(records) != 1 or app[:1] != b"\xe9" or factory[:1] != b"\xe9":
    raise ValueError("Expected one Deskgear JC3248W535 app image")
version, build = (s.decode("ascii") for s in records[0])
slots = {}
for magic, kind, subtype, offset, size, label, flags in struct.iter_unpack("<HBBII16sI", factory[0x8000:0x8c00]):
    if magic == 0x50AA and kind == 0:
        slots[subtype] = (offset, size)
if not {16, 17} <= slots.keys() or any(len(app) > size for _, size in slots.values()):
    raise ValueError("Missing or undersized OTA slots")
offset = slots[16][0]
if factory[offset:offset + len(app)] != app:
    raise ValueError("Factory and app images belong to different builds")
parser = argparse.ArgumentParser()
parser.add_argument("--output", type=Path, required=True)
out = parser.parse_args().output
shutil.copytree(root / "site", out, dirs_exist_ok=True)
shutil.copytree(files, out / "firmware", dirs_exist_ok=True)
manifest = {"name": "Mayday Deskgear", "version": version, "new_install_prompt_erase": True,
            "builds": [{"chipFamily": "ESP32-S3", "parts": [{"path": "firmware.factory.bin", "offset": 0}]}]}
(out / "firmware/manifest.json").write_text(json.dumps(manifest), encoding="utf8")
for path in out.rglob("*.html"):
    path.write_text(path.read_text(encoding="utf8").replace("{{VERSION}}",version), encoding="utf8")
print(version)
