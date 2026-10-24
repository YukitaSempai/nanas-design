const fs = require('fs');
const src = fs.readFileSync('lib/tienda.ts','utf8');
const C = {
  comboSanValentinPath: '/img/combo san Valentín',
  comboFloresAmarillasPath: '/img/combo flores amarillas',
  bouquetPath: '/img/bouquet',
  buchonesPath: '/img/buchones',
  cajaBombonesPath: '/img/caja con bombones',
  tulipanesEternosPath: '/img/tulipanes eternos'
};
C.catalogo1Path = C.comboSanValentinPath + '/catologo 1 rosas y tulipanes';
C.catalogo2Path = C.comboSanValentinPath + '/catalogo 2 girasoles, ramos maquillaje';
C.catalogo3Path = C.comboSanValentinPath + '/catalogo 3 ramos gomitas y personalizados';
C.catalogo4Path = C.comboSanValentinPath + '/catalogo 4';
C.floresAmarillas1Path = C.comboFloresAmarillasPath + '/flores amarillas';
C.floresAmarillas2Path = C.comboFloresAmarillasPath + '/flores amarillas edicion limitada';
C.floresAmarillas21sPath = C.comboFloresAmarillasPath + '/flores amarillas 21s/temporada 2026';
const re = /(?:src|cover):\s*`([^`]+)`/g;
const paths = new Set();
let m;
while ((m = re.exec(src))) {
  let p = m[1];
  for (const [k,v] of Object.entries(C)) {
    p = p.split('${' + k + '}').join(v);
  }
  paths.add(p);
}
const missing = [];
for (const p of paths) {
  const f = 'public' + p;
  if (!fs.existsSync(f)) {
    missing.push(p);
  }
}
console.log('rutas distintas:', paths.size);
console.log('faltantes:', missing.length);
missing.forEach(x => console.log('MISSING ' + x));
