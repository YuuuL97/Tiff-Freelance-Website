/** Zero-dependency authoring helper. The generated site runs without Node or a server. */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (file) => readFile(path.join(root, file), 'utf8');
const json = async (file) => JSON.parse(await read(`content/${file}.json`));
const [site, services, projects, experiences, layout] = await Promise.all([
  json('site'), json('services'), json('projects'), json('experience'), read('src/templates/layout.html')
]);
const escape = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
const render = (template, values) => template.replace(/{{(\w+)}}/g, (_, key) => {
  if (!(key in values)) throw new Error(`Missing template value: ${key}`);
  return values[key];
});
const image = (item, base = '', className = '', shape = 'landscape', loading = 'lazy') => {
  const classes = [className, item.imageFit === 'contain' ? 'image-contain' : ''].filter(Boolean).join(' ');
  const position = item.imagePosition ? ` style="object-position: ${escape(item.imagePosition)}"` : '';
  return `<img class="${classes}" src="${base}${escape(item.image)}" alt="${escape(item.imageAlt)}" width="${item.imageWidth || (shape === 'portrait' ? 900 : 1200)}" height="${item.imageHeight || (shape === 'portrait' ? 1000 : 720)}"${position} loading="${loading}" decoding="async">`;
};
const controls = (id, label) => `<div class="carousel-controls" hidden><button type="button" class="circle-button" data-direction="previous" aria-controls="${id}" aria-label="Previous ${label}"><span aria-hidden="true">‹</span></button><button type="button" class="circle-button" data-direction="next" aria-controls="${id}" aria-label="Next ${label}"><span aria-hidden="true">›</span></button></div>`;
const projectCard = (item) => `<li class="project-card"><a class="card-link" href="projects/${escape(item.slug)}.html">${image(item, '', 'card-image', 'portrait')}<h3>${escape(item.title)}</h3></a></li>`;
async function page(file, main, options = {}) {
  const base = file.includes('/') ? '../' : '';
  const title = options.title || 'Tiffany Jung — Art Operations, Production & Project Management';
  const description = options.description || site.description;
  const output = render(layout, {
    title: escape(title), description: escape(description), robots: options.noindex ? '<meta name="robots" content="noindex, nofollow">' : '',
    base, bodyClass: options.bodyClass || '', main,
    email: escape(site.email), phones: site.phones.map((phone) => `<a href="tel:${escape(phone.href)}">${escape(phone.label)}</a>`).join('\n        '),
    languages: escape(site.languages)
  });
  await mkdir(path.dirname(path.join(root, file)), { recursive: true });
  await writeFile(path.join(root, file), output);
  console.log(`Created ${file}`);
}

const home = render(await read('src/templates/home.html'), {
  intro: escape(site.intro), heroEyebrow: escape(site.heroEyebrow), heroLocation: escape(site.heroLocation), serviceControls: controls('service-track', 'services'), projectControls: controls('project-track', 'projects'),
  serviceCards: services.map((item, index) => `<li class="service-card"><a class="card-link" href="services/${escape(item.id)}.html">${image(item, '', 'card-image')}<p class="card-number">${String(index + 1).padStart(2, '0')}</p><h3>${escape(item.title)}</h3></a></li>`).join('\n        '),
  projectCards: projects.map((item) => projectCard(item)).join('\n        '),
  experienceCards: experiences.map((item) => `<li><div class="experience-entry"><h3>${escape(item.title)}</h3><p>${escape(item.role)}${item.note ? `<br>${escape(item.note)}` : ''}<br>${escape(item.location)}</p></div></li>`).join('\n        ')
});
await page('index.html', home, { bodyClass: 'home-page' });

// Service and project pages contain one image and their approved brief description.
const simpleDetailTemplate = await read('src/templates/simple-detail.html');
async function simpleDetail(item, listing, file) {
  const isService = listing === 'services';
  const description = (isService ? item.description : item.summary) || '[Add a short description of this project.]';
  const main = render(simpleDetailTemplate, {
    listing, kind: isService ? 'Service' : 'Project', heading: escape(item.title),
    hero: image(item.detailImage ? {
      ...item, image: item.detailImage, imageAlt: item.detailImageAlt ?? item.imageAlt,
      imageWidth: item.detailImageWidth, imageHeight: item.detailImageHeight
    } : item, '../', 'detail-hero', isService ? 'landscape' : 'portrait', 'eager'),
    description: escape(description)
  });
  await page(file || `${listing}/${isService ? item.id : item.slug}.html`, main, {
    title: `${item.title} — Tiffany Jung`,
    description: (isService ? item.description : item.summary) || `${item.title}. A selected project by Tiffany Jung.`,
    noindex: item.draft !== false
  });
}
for (const service of services) await simpleDetail(service, 'services');
for (const project of projects) await simpleDetail(project, 'projects');

await simpleDetail({title: '[Project title]', image: 'assets/images/placeholders/landscape.svg', imageAlt: '', summary: '[Add a short description of this project.]'}, 'projects', 'templates/project-detail.html');
