import './installer-theme.js';
import {installVersionDialogIntegration} from './deskgear-dialog.js';
const base = new URL('../firmware/', import.meta.url);
const go = document.querySelector('#usb-go'), ok = document.querySelector('#board-ok');
const status = document.querySelector('#usb-status');
const en = document.documentElement.lang === 'en';
async function prepare(){
  if (!navigator.serial || !window.isSecureContext) {
    status.textContent=en?'Use desktop Chrome or Edge for USB installation.':'USB 설치는 PC용 Chrome 또는 Edge에서 이용하세요.';
    return;
  }
  const get=async name=>{
    const response=await fetch(new URL(name,base),{cache:'no-store'});
    if(!response.ok)throw Error(name);
    return response;
  };
  const [release,bytes]=await Promise.all([get('release.json').then(r=>r.json()),get('firmware.bin').then(r=>r.arrayBuffer())]);
  const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)), n=>n.toString(16).padStart(2,'0')).join('');
  if(digest!==release.sha256)throw Error('release mismatch');
  const manifest=new URL('manifest.json',base);
  await installVersionDialogIntegration(manifest,{...release,appBytes:new Uint8Array(bytes)});
  document.querySelector('esp-web-install-button').setAttribute('manifest',manifest.href);
  await import('https://unpkg.com/esp-web-tools@10.4.0/dist/web/install-button.js?module');
  ok.onchange=()=>{go.disabled=!ok.checked;};
  go.disabled=!ok.checked;
  status.textContent=en?'Ready · Connect to check device version':'설치 준비 완료 · 연결하면 기기 버전을 확인합니다.';
}
prepare().catch(()=>{go.disabled=true;status.textContent=en?'Could not prepare the installer. Refresh to retry.':'설치 준비에 실패했습니다. 새로고침해 다시 시도하세요.';});
