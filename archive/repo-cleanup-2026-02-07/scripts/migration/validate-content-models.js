#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const matter = require('gray-matter');
const fg = require('fast-glob');

const ROOT_DIR = path.resolve(__dirname, '../..');
const UNIT_SL_PLAN_GLOB = 'src/pages/ib-2027/sl/unit-*/unit-plan.njk';
const UNIT_HL_PLAN_GLOB = 'src/pages/ib-2027/hl/unit-*/unit-plan.njk';
const UNIT_SL_INDEX_GLOB = 'src/pages/ib-2027/sl/unit-*/index.njk';
const UNIT_HL_INDEX_GLOB = 'src/pages/ib-2027/hl/unit-*/index.njk';
const UNIT_SL_SCENARIO_GLOB = 'src/pages/ib-2027/sl/unit-5/scenarios/scenario-*.njk';
const UNIT_SL_OOP_PROJECT_GLOB = 'src/pages/ib-2027/sl/unit-5/oop-project/**/*.njk';
const UNIT_IB_SLIDE_GLOB = 'src/pages/ib-2027/{sl,hl}/unit-*/slides/*.html';
const IB_ALIAS_SLIDE_GLOB = 'public/ib-2027/{sl,hl}/slides/*.html';
const IB_ALIAS_SCENARIO_GLOBS = [
  'public/ib-2027/sl/scenarios/*.html',
  'public/ib-2027/hl/scenarios/*.html',
  'public/ib-2027/hl/unit-4/scenarios/*.html'
];
const IB_LEGACY_HTML_GLOB = 'public/ib/**/*.html';
const IB_LEGACY_NJK_GLOB = 'src/pages/ib/**/*.njk';
const IGCSE_LEGACY_HTML_GLOB = 'public/igcse/**/*.html';
const KS3_LEGACY_HTML_GLOB = 'public/ks3/**/*.html';
const ROOT_LEGACY_HTML_GLOB = 'public/{404,admin,coming-soon}.html';
const IB_LEGACY_PUBLIC_ROOT = path.join(ROOT_DIR, 'public/ib');

const FILES = {
  home: path.join(ROOT_DIR, 'src/pages/index.njk'),
  siteData: path.join(ROOT_DIR, 'src/data/site.json'),
  ib2027Index: path.join(ROOT_DIR, 'src/pages/ib-2027/index.njk'),
  ib2027SlIndex: path.join(ROOT_DIR, 'src/pages/ib-2027/sl/index.njk'),
  ib2027HlIndex: path.join(ROOT_DIR, 'src/pages/ib-2027/hl/index.njk')
};

const errors = [];

const fail = (pathKey, message) => {
  errors.push(`${pathKey}: ${message}`);
};

const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

const assertString = (value, pathKey) => {
  if (typeof value !== 'string' || value.trim().length === 0) {
    fail(pathKey, 'must be a non-empty string');
    return false;
  }
  return true;
};

const assertArray = (value, pathKey) => {
  if (!Array.isArray(value)) {
    fail(pathKey, 'must be an array');
    return false;
  }
  return true;
};

const readFrontmatter = async (filePath) => {
  const raw = await fs.readFile(filePath, 'utf8');
  return matter(raw).data;
};

const validateHomeCards = (frontmatter) => {
  if (!assertArray(frontmatter.cards, 'home.cards')) return;

  frontmatter.cards.forEach((card, index) => {
    if (!isObject(card)) {
      fail(`home.cards[${index}]`, 'must be an object');
      return;
    }
    assertString(card.href, `home.cards[${index}].href`);
    assertString(card.title, `home.cards[${index}].title`);

    if (card.desc !== undefined && typeof card.desc !== 'string') {
      fail(`home.cards[${index}].desc`, 'must be a string when present');
    }
    if (card.icon !== undefined && typeof card.icon !== 'string') {
      fail(`home.cards[${index}].icon`, 'must be a string when present');
    }
    if (card.comingSoon !== undefined && typeof card.comingSoon !== 'boolean') {
      fail(`home.cards[${index}].comingSoon`, 'must be a boolean when present');
    }
  });
};

const validateTopicListing = (listing, modelName) => {
  if (!isObject(listing)) {
    fail(modelName, 'must be an object');
    return;
  }

  if (!assertArray(listing.sections, `${modelName}.sections`)) return;

  listing.sections.forEach((section, sectionIndex) => {
    if (!isObject(section)) {
      fail(`${modelName}.sections[${sectionIndex}]`, 'must be an object');
      return;
    }

    assertString(section.title, `${modelName}.sections[${sectionIndex}].title`);

    if (section.subtitle !== undefined && typeof section.subtitle !== 'string') {
      fail(`${modelName}.sections[${sectionIndex}].subtitle`, 'must be a string when present');
    }

    if (!assertArray(section.items, `${modelName}.sections[${sectionIndex}].items`)) return;

    section.items.forEach((item, itemIndex) => {
      if (!isObject(item)) {
        fail(`${modelName}.sections[${sectionIndex}].items[${itemIndex}]`, 'must be an object');
        return;
      }
      assertString(item.href, `${modelName}.sections[${sectionIndex}].items[${itemIndex}].href`);
      assertString(item.number, `${modelName}.sections[${sectionIndex}].items[${itemIndex}].number`);
      assertString(item.name, `${modelName}.sections[${sectionIndex}].items[${itemIndex}].name`);
    });
  });
};

const validateIgcseListing = (siteData) => {
  if (!isObject(siteData)) {
    fail('siteData', 'must be an object');
    return;
  }

  const listings = siteData.listings;
  if (!isObject(listings)) {
    fail('siteData.listings', 'must be an object');
    return;
  }

  const igcse = listings.igcse;
  validateTopicListing(igcse, 'siteData.listings.igcse');
};

const validateCurriculumIndexFrontmatter = (frontmatter, modelName, options = {}) => {
  const { requireListingKey = false } = options;

  assertString(frontmatter.title, `${modelName}.title`);

  if (frontmatter.description !== undefined && typeof frontmatter.description !== 'string') {
    fail(`${modelName}.description`, 'must be a string when present');
  }

  if (frontmatter.activeSection !== undefined && typeof frontmatter.activeSection !== 'string') {
    fail(`${modelName}.activeSection`, 'must be a string when present');
  }

  if (!isObject(frontmatter.hero)) {
    fail(`${modelName}.hero`, 'must be an object');
  } else {
    assertString(frontmatter.hero.title, `${modelName}.hero.title`);
    if (frontmatter.hero.subtitle !== undefined && typeof frontmatter.hero.subtitle !== 'string') {
      fail(`${modelName}.hero.subtitle`, 'must be a string when present');
    }
  }

  if (frontmatter.breadcrumbs !== undefined) {
    if (!assertArray(frontmatter.breadcrumbs, `${modelName}.breadcrumbs`)) return;
    frontmatter.breadcrumbs.forEach((crumb, index) => {
      if (!isObject(crumb)) {
        fail(`${modelName}.breadcrumbs[${index}]`, 'must be an object');
        return;
      }
      assertString(crumb.label, `${modelName}.breadcrumbs[${index}].label`);
      if (crumb.href !== undefined && typeof crumb.href !== 'string') {
        fail(`${modelName}.breadcrumbs[${index}].href`, 'must be a string when present');
      }
    });
  }

  if (requireListingKey) {
    assertString(frontmatter.listingKey, `${modelName}.listingKey`);
  }
};

const validateListingKeyReference = (siteData, listingKey, modelName) => {
  if (!isObject(siteData)) {
    fail('siteData', 'must be an object');
    return;
  }

  const listings = siteData.listings;
  if (!isObject(listings)) {
    fail('siteData.listings', 'must be an object');
    return;
  }

  const listing = listings[listingKey];
  if (!isObject(listing)) {
    fail(`${modelName}.listingKey`, `references missing listing "${listingKey}" in siteData.listings`);
    return;
  }

  validateTopicListing(listing, `siteData.listings.${listingKey}`);
};

const validateLegacyRichFrontmatter = (frontmatter, modelName) => {
  assertString(frontmatter.title, `${modelName}.title`);

  if (frontmatter.description !== undefined && typeof frontmatter.description !== 'string') {
    fail(`${modelName}.description`, 'must be a string when present');
  }

  if (frontmatter.activeSection !== undefined && typeof frontmatter.activeSection !== 'string') {
    fail(`${modelName}.activeSection`, 'must be a string when present');
  }

  if (frontmatter.breadcrumbs !== undefined) {
    if (!assertArray(frontmatter.breadcrumbs, `${modelName}.breadcrumbs`)) return;
    frontmatter.breadcrumbs.forEach((crumb, index) => {
      if (!isObject(crumb)) {
        fail(`${modelName}.breadcrumbs[${index}]`, 'must be an object');
        return;
      }
      assertString(crumb.label, `${modelName}.breadcrumbs[${index}].label`);
      if (crumb.href !== undefined && typeof crumb.href !== 'string') {
        fail(`${modelName}.breadcrumbs[${index}].href`, 'must be a string when present');
      }
    });
  }

  if (frontmatter.extraStyles !== undefined) {
    if (!assertArray(frontmatter.extraStyles, `${modelName}.extraStyles`)) return;
    frontmatter.extraStyles.forEach((stylePath, index) => {
      assertString(stylePath, `${modelName}.extraStyles[${index}]`);
    });
  }
};

const validateLegacySlideHtml = (htmlContent, modelName) => {
  if (typeof htmlContent !== 'string' || htmlContent.trim().length === 0) {
    fail(`${modelName}.html`, 'must be non-empty HTML content');
    return;
  }

  if (!/<html[\s>]/i.test(htmlContent)) {
    fail(`${modelName}.html`, 'must include an <html> element');
  }

  if (!/<body[\s>]/i.test(htmlContent)) {
    fail(`${modelName}.html`, 'must include a <body> element');
  }

  if (!/<title>[^<]+<\/title>/i.test(htmlContent)) {
    fail(`${modelName}.title`, 'must include a non-empty <title>');
  }
};

const validateUnitPlan = (frontmatter, modelName = 'unitPlan') => {
  assertString(frontmatter.title, `${modelName}.title`);
  assertString(frontmatter.unitName, `${modelName}.unitName`);
  assertString(frontmatter.level, `${modelName}.level`);

  if (typeof frontmatter.unitNumber !== 'number') {
    fail(`${modelName}.unitNumber`, 'must be a number');
  }

  if (frontmatter.viewSlidesButtons !== undefined) {
    if (!assertArray(frontmatter.viewSlidesButtons, `${modelName}.viewSlidesButtons`)) return;
    frontmatter.viewSlidesButtons.forEach((button, index) => {
      if (!isObject(button)) {
        fail(`${modelName}.viewSlidesButtons[${index}]`, 'must be an object');
        return;
      }
      assertString(button.label, `${modelName}.viewSlidesButtons[${index}].label`);
      assertString(button.href, `${modelName}.viewSlidesButtons[${index}].href`);
    });
  }

  if (!isObject(frontmatter.introduction)) {
    fail(`${modelName}.introduction`, 'must be an object');
  } else {
    ['bigQuestion', 'overview', 'journey'].forEach((field) => {
      assertString(frontmatter.introduction[field], `${modelName}.introduction.${field}`);
    });
  }

  if (frontmatter.concepts !== undefined) {
    if (!assertArray(frontmatter.concepts, `${modelName}.concepts`)) return;
    frontmatter.concepts.forEach((concept, index) => {
      if (!isObject(concept)) {
        fail(`${modelName}.concepts[${index}]`, 'must be an object');
        return;
      }
      assertString(concept.title, `${modelName}.concepts[${index}].title`);
      assertString(concept.content, `${modelName}.concepts[${index}].content`);
      if (concept.icon !== undefined && typeof concept.icon !== 'string') {
        fail(`${modelName}.concepts[${index}].icon`, 'must be a string when present');
      }
    });
  }

  if (frontmatter.terminology !== undefined) {
    if (!assertArray(frontmatter.terminology, `${modelName}.terminology`)) return;
    frontmatter.terminology.forEach((term, index) => {
      if (!isObject(term)) {
        fail(`${modelName}.terminology[${index}]`, 'must be an object');
        return;
      }
      assertString(term.term, `${modelName}.terminology[${index}].term`);
      assertString(term.definition, `${modelName}.terminology[${index}].definition`);
    });
  }

  if (frontmatter.syllabusPoints !== undefined) {
    if (!assertArray(frontmatter.syllabusPoints, `${modelName}.syllabusPoints`)) return;
    frontmatter.syllabusPoints.forEach((point, index) => {
      if (!isObject(point)) {
        fail(`${modelName}.syllabusPoints[${index}]`, 'must be an object');
        return;
      }
      assertString(point.code, `${modelName}.syllabusPoints[${index}].code`);
      assertString(point.topic, `${modelName}.syllabusPoints[${index}].topic`);
    });
  }

  if (frontmatter.applications !== undefined) {
    if (!assertArray(frontmatter.applications, `${modelName}.applications`)) return;
    frontmatter.applications.forEach((application, index) => {
      assertString(application, `${modelName}.applications[${index}]`);
    });
  }
};

const validateUnitResource = (resource, pathKey) => {
  if (!isObject(resource)) {
    fail(pathKey, 'must be an object');
    return;
  }
  assertString(resource.href, `${pathKey}.href`);
  assertString(resource.name, `${pathKey}.name`);
  if (resource.number !== undefined && typeof resource.number !== 'string') {
    fail(`${pathKey}.number`, 'must be a string when present');
  }
  if (resource.type !== undefined && typeof resource.type !== 'string') {
    fail(`${pathKey}.type`, 'must be a string when present');
  }
  if (resource.target !== undefined && typeof resource.target !== 'string') {
    fail(`${pathKey}.target`, 'must be a string when present');
  }
};

const validateUnitIndex = (frontmatter, modelName) => {
  assertString(frontmatter.title, `${modelName}.title`);
  if (frontmatter.description !== undefined && typeof frontmatter.description !== 'string') {
    fail(`${modelName}.description`, 'must be a string when present');
  }

  if (!isObject(frontmatter.hero)) {
    fail(`${modelName}.hero`, 'must be an object');
  } else {
    assertString(frontmatter.hero.title, `${modelName}.hero.title`);
    if (frontmatter.hero.subtitle !== undefined && typeof frontmatter.hero.subtitle !== 'string') {
      fail(`${modelName}.hero.subtitle`, 'must be a string when present');
    }
  }

  if (frontmatter.resourcesTitle !== undefined && typeof frontmatter.resourcesTitle !== 'string') {
    fail(`${modelName}.resourcesTitle`, 'must be a string when present');
  }

  if (frontmatter.resourcesSecondaryTitle !== undefined && typeof frontmatter.resourcesSecondaryTitle !== 'string') {
    fail(`${modelName}.resourcesSecondaryTitle`, 'must be a string when present');
  }

  if (!assertArray(frontmatter.cards, `${modelName}.cards`)) return;
  frontmatter.cards.forEach((card, index) => {
    if (!isObject(card)) {
      fail(`${modelName}.cards[${index}]`, 'must be an object');
      return;
    }
    assertString(card.href, `${modelName}.cards[${index}].href`);
    assertString(card.title, `${modelName}.cards[${index}].title`);
    if (card.image !== undefined && typeof card.image !== 'string') {
      fail(`${modelName}.cards[${index}].image`, 'must be a string when present');
    }
  });

  if (!assertArray(frontmatter.resources, `${modelName}.resources`)) return;
  frontmatter.resources.forEach((resource, index) => {
    validateUnitResource(resource, `${modelName}.resources[${index}]`);
  });

  if (frontmatter.resourcesSecondary !== undefined) {
    if (!assertArray(frontmatter.resourcesSecondary, `${modelName}.resourcesSecondary`)) return;
    frontmatter.resourcesSecondary.forEach((resource, index) => {
      validateUnitResource(resource, `${modelName}.resourcesSecondary[${index}]`);
    });
  }
};

const getUnitNumberFromPath = (filePath) => {
  const match = filePath.match(/unit-(\d+)[/\\](?:index|unit-plan)\.njk$/);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
};

const getUnitIndexMetaFromPath = (filePath) => {
  const match = filePath.match(/ib-2027[/\\](sl|hl)[/\\]unit-(\d+)[/\\]index\.njk$/);
  if (!match) {
    return null;
  }

  return {
    level: match[1],
    unitNumber: Number(match[2])
  };
};

const getUnitPlanMetaFromPath = (filePath) => {
  const match = filePath.match(/ib-2027[/\\](sl|hl)[/\\]unit-(\d+)[/\\]unit-plan\.njk$/);
  if (!match) {
    return null;
  }

  return {
    level: match[1],
    unitNumber: Number(match[2])
  };
};

const getSlideMetaFromPath = (filePath) => {
  const match = filePath.match(/ib-2027[/\\](sl|hl)[/\\]unit-(\d+)[/\\]slides[/\\](.+)\.html$/);
  if (!match) {
    return null;
  }

  return {
    level: match[1],
    unitNumber: Number(match[2]),
    slideSlug: match[3]
  };
};

const getAliasRouteFromPublicPath = (filePath) => {
  const relativePath = path
    .relative(path.join(ROOT_DIR, 'public'), filePath)
    .replace(/\\/g, '/');

  if (!relativePath.startsWith('ib-2027/') || !relativePath.endsWith('.html')) {
    return null;
  }

  return `/${relativePath}`;
};

const getIbLegacyRouteMetaFromNunjucksPath = (filePath) => {
  const relativePath = path
    .relative(path.join(ROOT_DIR, 'src/pages/ib'), filePath)
    .replace(/\\/g, '/');

  if (!relativePath.endsWith('.njk') || relativePath.startsWith('..')) {
    return null;
  }

  const routePath = `/ib/${relativePath.replace(/\.njk$/, '.html')}`;
  const routeMatch = routePath.match(/^\/ib\/([^/]+)\/([^/]+)\.html$/);

  return {
    routePath,
    section: routeMatch ? routeMatch[1] : null,
    page: routeMatch ? routeMatch[2] : null
  };
};

const validateIbLegacyFrontmatter = (frontmatter, modelName) => {
  assertString(frontmatter.layout, `${modelName}.layout`);

  if (frontmatter.activeSection !== undefined && frontmatter.activeSection !== 'ib') {
    fail(`${modelName}.activeSection`, 'must equal "ib" when present');
  }
};

const run = async () => {
  for (const [name, filePath] of Object.entries(FILES)) {
    if (!(await fs.pathExists(filePath))) {
      fail(`files.${name}`, `missing file ${path.relative(ROOT_DIR, filePath)}`);
    }
  }

  const unitIndexFiles = (await fg([UNIT_SL_INDEX_GLOB, UNIT_HL_INDEX_GLOB], { cwd: ROOT_DIR, absolute: true })).sort((a, b) => {
    const metaA = getUnitIndexMetaFromPath(a);
    const metaB = getUnitIndexMetaFromPath(b);
    const levelWeightA = metaA ? (metaA.level === 'sl' ? 0 : 1) : 2;
    const levelWeightB = metaB ? (metaB.level === 'sl' ? 0 : 1) : 2;

    if (levelWeightA !== levelWeightB) {
      return levelWeightA - levelWeightB;
    }

    if (metaA && metaB) {
      return metaA.unitNumber - metaB.unitNumber;
    }

    return a.localeCompare(b);
  });
  const unitPlanFiles = (await fg([UNIT_SL_PLAN_GLOB, UNIT_HL_PLAN_GLOB], { cwd: ROOT_DIR, absolute: true })).sort((a, b) => {
    const metaA = getUnitPlanMetaFromPath(a);
    const metaB = getUnitPlanMetaFromPath(b);
    const levelWeightA = metaA ? (metaA.level === 'sl' ? 0 : 1) : 2;
    const levelWeightB = metaB ? (metaB.level === 'sl' ? 0 : 1) : 2;

    if (levelWeightA !== levelWeightB) {
      return levelWeightA - levelWeightB;
    }

    if (metaA && metaB) {
      return metaA.unitNumber - metaB.unitNumber;
    }

    return getUnitNumberFromPath(a) - getUnitNumberFromPath(b);
  });
  const unitScenarioFiles = (await fg([UNIT_SL_SCENARIO_GLOB], { cwd: ROOT_DIR, absolute: true })).sort((a, b) =>
    a.localeCompare(b)
  );
  const unitOopProjectFiles = (await fg([UNIT_SL_OOP_PROJECT_GLOB], { cwd: ROOT_DIR, absolute: true })).sort((a, b) =>
    a.localeCompare(b)
  );
  const unitSlideFiles = (await fg([UNIT_IB_SLIDE_GLOB], { cwd: ROOT_DIR, absolute: true })).sort((a, b) => {
    const metaA = getSlideMetaFromPath(a);
    const metaB = getSlideMetaFromPath(b);
    const levelWeightA = metaA ? (metaA.level === 'sl' ? 0 : 1) : 2;
    const levelWeightB = metaB ? (metaB.level === 'sl' ? 0 : 1) : 2;

    if (levelWeightA !== levelWeightB) {
      return levelWeightA - levelWeightB;
    }

    if (metaA && metaB) {
      if (metaA.unitNumber !== metaB.unitNumber) {
        return metaA.unitNumber - metaB.unitNumber;
      }

      return metaA.slideSlug.localeCompare(metaB.slideSlug);
    }

    return a.localeCompare(b);
  });
  const aliasSlideFiles = (await fg([IB_ALIAS_SLIDE_GLOB], { cwd: ROOT_DIR, absolute: true })).sort((a, b) =>
    a.localeCompare(b)
  );
  const aliasScenarioFiles = (await fg(IB_ALIAS_SCENARIO_GLOBS, { cwd: ROOT_DIR, absolute: true })).sort((a, b) =>
    a.localeCompare(b)
  );
  const ibLegacyNunjucksFiles = (await fg([IB_LEGACY_NJK_GLOB], { cwd: ROOT_DIR, absolute: true })).sort((a, b) =>
    a.localeCompare(b)
  );
  const ibLegacyHtmlFiles = (await fg([IB_LEGACY_HTML_GLOB], { cwd: ROOT_DIR, absolute: true })).sort((a, b) =>
    a.localeCompare(b)
  );
  const igcseLegacyHtmlFiles = (await fg([IGCSE_LEGACY_HTML_GLOB], { cwd: ROOT_DIR, absolute: true })).sort((a, b) =>
    a.localeCompare(b)
  );
  const ks3LegacyHtmlFiles = (await fg([KS3_LEGACY_HTML_GLOB], { cwd: ROOT_DIR, absolute: true })).sort((a, b) =>
    a.localeCompare(b)
  );
  const rootLegacyHtmlFiles = (await fg([ROOT_LEGACY_HTML_GLOB], { cwd: ROOT_DIR, absolute: true })).sort((a, b) =>
    a.localeCompare(b)
  );

  if (unitIndexFiles.length === 0) {
    fail('files.unitIndexes', `no files found matching ${UNIT_SL_INDEX_GLOB} and ${UNIT_HL_INDEX_GLOB}`);
  }

  if (unitPlanFiles.length === 0) {
    fail('files.unitPlans', `no files found matching ${UNIT_SL_PLAN_GLOB} and ${UNIT_HL_PLAN_GLOB}`);
  }

  if (unitScenarioFiles.length === 0) {
    fail('files.unitScenarios', `no files found matching ${UNIT_SL_SCENARIO_GLOB}`);
  }

  if (unitOopProjectFiles.length === 0) {
    fail('files.unitOopProject', `no files found matching ${UNIT_SL_OOP_PROJECT_GLOB}`);
  }

  if (unitSlideFiles.length === 0) {
    fail('files.unitSlides', `no files found matching ${UNIT_IB_SLIDE_GLOB}`);
  }

  if (aliasSlideFiles.length === 0) {
    fail('files.aliasSlides', `no files found matching ${IB_ALIAS_SLIDE_GLOB}`);
  }

  if (aliasScenarioFiles.length === 0) {
    fail('files.aliasScenarios', `no files found matching ${IB_ALIAS_SCENARIO_GLOBS.join(', ')}`);
  }

  if (ibLegacyNunjucksFiles.length === 0) {
    fail('files.ibLegacyNunjucks', `no files found matching ${IB_LEGACY_NJK_GLOB}`);
  }

  if (ibLegacyHtmlFiles.length === 0) {
    fail('files.ibLegacyHtml', `no files found matching ${IB_LEGACY_HTML_GLOB}`);
  }

  if (igcseLegacyHtmlFiles.length === 0) {
    fail('files.igcseLegacyHtml', `no files found matching ${IGCSE_LEGACY_HTML_GLOB}`);
  }

  if (ks3LegacyHtmlFiles.length === 0) {
    fail('files.ks3LegacyHtml', `no files found matching ${KS3_LEGACY_HTML_GLOB}`);
  }

  if (rootLegacyHtmlFiles.length < 3) {
    fail('files.rootLegacyHtml', `expected 3 files matching ${ROOT_LEGACY_HTML_GLOB}, found ${rootLegacyHtmlFiles.length}`);
  }

  if (errors.length > 0) {
    console.error(`Content model validation failed before parsing: ${errors.length} issue(s).`);
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }

  const home = await readFrontmatter(FILES.home);
  const siteData = await fs.readJson(FILES.siteData);
  const ib2027Index = await readFrontmatter(FILES.ib2027Index);
  const ib2027SlIndex = await readFrontmatter(FILES.ib2027SlIndex);
  const ib2027HlIndex = await readFrontmatter(FILES.ib2027HlIndex);

  validateHomeCards(home);
  validateIgcseListing(siteData);
  validateCurriculumIndexFrontmatter(ib2027Index, 'ib2027Index');
  validateCurriculumIndexFrontmatter(ib2027SlIndex, 'ib2027SlIndex', { requireListingKey: true });
  validateCurriculumIndexFrontmatter(ib2027HlIndex, 'ib2027HlIndex', { requireListingKey: true });

  if (typeof ib2027SlIndex.listingKey === 'string') {
    validateListingKeyReference(siteData, ib2027SlIndex.listingKey, 'ib2027SlIndex');
  }

  if (typeof ib2027HlIndex.listingKey === 'string') {
    validateListingKeyReference(siteData, ib2027HlIndex.listingKey, 'ib2027HlIndex');
  }

  const validatedUnitPlanModels = [];
  for (const unitPlanFile of unitPlanFiles) {
    const unitMatch = unitPlanFile.match(/ib-2027[/\\](sl|hl)[/\\]unit-(\d+)[/\\]unit-plan\.njk$/);
    const unitModelName = unitMatch
      ? `${unitMatch[1]}Unit${unitMatch[2]}Plan`
      : `${path.basename(path.dirname(unitPlanFile))}Plan`;
    const unitPlan = await readFrontmatter(unitPlanFile);
    validateUnitPlan(unitPlan, unitModelName);
    validatedUnitPlanModels.push(unitModelName);
  }

  const validatedUnitIndexModels = [];
  for (const unitIndexFile of unitIndexFiles) {
    const unitMatch = unitIndexFile.match(/ib-2027[/\\](sl|hl)[/\\]unit-(\d+)[/\\]index\.njk$/);
    const unitModelName = unitMatch
      ? `${unitMatch[1]}Unit${unitMatch[2]}Index`
      : `${path.basename(path.dirname(unitIndexFile))}Index`;
    const unitIndex = await readFrontmatter(unitIndexFile);
    validateUnitIndex(unitIndex, unitModelName);
    validatedUnitIndexModels.push(unitModelName);
  }

  const validatedScenarioModels = [];
  for (const unitScenarioFile of unitScenarioFiles) {
    const scenarioMatch = unitScenarioFile.match(/scenario-(\d+)-/);
    const scenarioModelName = scenarioMatch
      ? `slUnit5Scenario${scenarioMatch[1]}`
      : path.basename(unitScenarioFile, '.njk');
    const scenarioFrontmatter = await readFrontmatter(unitScenarioFile);
    validateLegacyRichFrontmatter(scenarioFrontmatter, scenarioModelName);
    validatedScenarioModels.push(scenarioModelName);
  }

  const validatedOopProjectModels = [];
  for (const unitOopProjectFile of unitOopProjectFiles) {
    const relativePath = path
      .relative(path.join(ROOT_DIR, 'src/pages/ib-2027/sl/unit-5/oop-project'), unitOopProjectFile)
      .replace(/\\/g, '/')
      .replace(/\.njk$/, '');
    const normalizedName = relativePath
      .split('/')
      .map((segment) => segment.replace(/[^a-zA-Z0-9]+/g, ' ').trim())
      .filter(Boolean)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1).replace(/\s+/g, ''))
      .join('');
    const oopModelName = `slUnit5OopProject${normalizedName}`;
    const oopProjectFrontmatter = await readFrontmatter(unitOopProjectFile);
    validateLegacyRichFrontmatter(oopProjectFrontmatter, oopModelName);
    validatedOopProjectModels.push(oopModelName);
  }

  const validatedSlideModels = [];
  for (const unitSlideFile of unitSlideFiles) {
    const slideMeta = getSlideMetaFromPath(unitSlideFile);
    const fallbackModelName = path.basename(unitSlideFile, '.html');
    const modelName = slideMeta
      ? `${slideMeta.level}Unit${slideMeta.unitNumber}Slide${slideMeta.slideSlug
          .replace(/[^a-zA-Z0-9]+/g, ' ')
          .trim()
          .split(/\s+/)
          .filter(Boolean)
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join('')}`
      : fallbackModelName;
    const slideHtml = await fs.readFile(unitSlideFile, 'utf8');
    validateLegacySlideHtml(slideHtml, modelName);
    validatedSlideModels.push(modelName);
  }

  const validatedAliasModels = [];
  for (const aliasSlideFile of aliasSlideFiles) {
    const routePath = getAliasRouteFromPublicPath(aliasSlideFile);
    const fallbackName = path.basename(aliasSlideFile, '.html');
    const normalizedName = (routePath || fallbackName)
      .replace(/^\/ib-2027\//, '')
      .replace(/\.html$/, '')
      .split('/')
      .map((segment) => segment.replace(/[^a-zA-Z0-9]+/g, ' ').trim())
      .filter(Boolean)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1).replace(/\s+/g, ''))
      .join('');
    const modelName = `ibAliasSlide${normalizedName}`;
    const aliasHtml = await fs.readFile(aliasSlideFile, 'utf8');
    validateLegacySlideHtml(aliasHtml, modelName);
    validatedAliasModels.push(modelName);
  }

  for (const aliasScenarioFile of aliasScenarioFiles) {
    const routePath = getAliasRouteFromPublicPath(aliasScenarioFile);
    const fallbackName = path.basename(aliasScenarioFile, '.html');
    const normalizedName = (routePath || fallbackName)
      .replace(/^\/ib-2027\//, '')
      .replace(/\.html$/, '')
      .split('/')
      .map((segment) => segment.replace(/[^a-zA-Z0-9]+/g, ' ').trim())
      .filter(Boolean)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1).replace(/\s+/g, ''))
      .join('');
    const modelName = `ibAliasScenario${normalizedName}`;
    const aliasHtml = await fs.readFile(aliasScenarioFile, 'utf8');
    validateLegacySlideHtml(aliasHtml, modelName);
    validatedAliasModels.push(modelName);
  }

  const validatedIbLegacyModels = [];
  for (const ibLegacyNunjucksFile of ibLegacyNunjucksFiles) {
    const routeMeta = getIbLegacyRouteMetaFromNunjucksPath(ibLegacyNunjucksFile);
    if (!routeMeta) {
      fail('ibLegacy.routeMap', `unable to map Nunjucks route: ${path.relative(ROOT_DIR, ibLegacyNunjucksFile)}`);
      continue;
    }

    const routeModelSlug = routeMeta.routePath
      .replace(/^\/ib\//, '')
      .replace(/\.html$/, '')
      .split('/')
      .map((segment) => segment.replace(/[^a-zA-Z0-9]+/g, ' ').trim())
      .filter(Boolean)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1).replace(/\s+/g, ''))
      .join('');
    const modelName = `ibLegacy${routeModelSlug}`;

    const frontmatter = await readFrontmatter(ibLegacyNunjucksFile);
    validateIbLegacyFrontmatter(frontmatter, modelName);

    const legacyHtmlPath = path.join(IB_LEGACY_PUBLIC_ROOT, routeMeta.routePath.replace(/^\/ib\//, ''));
    if (!(await fs.pathExists(legacyHtmlPath))) {
      fail(`${modelName}.source`, `missing legacy HTML source ${path.relative(ROOT_DIR, legacyHtmlPath)}`);
      continue;
    }

    const legacyHtml = await fs.readFile(legacyHtmlPath, 'utf8');
    validateLegacySlideHtml(legacyHtml, modelName);
    validatedIbLegacyModels.push(modelName);
  }

  let validatedIgcseLegacyHtmlCount = 0;
  for (const igcseLegacyHtmlFile of igcseLegacyHtmlFiles) {
    const relativePath = path.relative(path.join(ROOT_DIR, 'public/igcse'), igcseLegacyHtmlFile).replace(/\\/g, '/');
    const normalizedName = relativePath
      .replace(/\.html$/, '')
      .split('/')
      .map((segment) => segment.replace(/[^a-zA-Z0-9]+/g, ' ').trim())
      .filter(Boolean)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1).replace(/\s+/g, ''))
      .join('');
    const modelName = `igcseLegacy${normalizedName}`;

    const legacyHtml = await fs.readFile(igcseLegacyHtmlFile, 'utf8');
    validateLegacySlideHtml(legacyHtml, modelName);
    validatedIgcseLegacyHtmlCount += 1;
  }

  let validatedIbLegacyHtmlCount = 0;
  for (const ibLegacyHtmlFile of ibLegacyHtmlFiles) {
    const relativePath = path.relative(path.join(ROOT_DIR, 'public/ib'), ibLegacyHtmlFile).replace(/\\/g, '/');
    const normalizedName = relativePath
      .replace(/\.html$/, '')
      .split('/')
      .map((segment) => segment.replace(/[^a-zA-Z0-9]+/g, ' ').trim())
      .filter(Boolean)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1).replace(/\s+/g, ''))
      .join('');
    const modelName = `ibLegacyHtml${normalizedName}`;

    const legacyHtml = await fs.readFile(ibLegacyHtmlFile, 'utf8');
    validateLegacySlideHtml(legacyHtml, modelName);
    validatedIbLegacyHtmlCount += 1;
  }

  let validatedKs3LegacyHtmlCount = 0;
  for (const ks3LegacyHtmlFile of ks3LegacyHtmlFiles) {
    const relativePath = path.relative(path.join(ROOT_DIR, 'public/ks3'), ks3LegacyHtmlFile).replace(/\\/g, '/');
    const normalizedName = relativePath
      .replace(/\.html$/, '')
      .split('/')
      .map((segment) => segment.replace(/[^a-zA-Z0-9]+/g, ' ').trim())
      .filter(Boolean)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1).replace(/\s+/g, ''))
      .join('');
    const modelName = `ks3LegacyHtml${normalizedName}`;

    const legacyHtml = await fs.readFile(ks3LegacyHtmlFile, 'utf8');
    validateLegacySlideHtml(legacyHtml, modelName);
    validatedKs3LegacyHtmlCount += 1;
  }

  let validatedRootLegacyHtmlCount = 0;
  for (const rootLegacyHtmlFile of rootLegacyHtmlFiles) {
    const fileName = path.basename(rootLegacyHtmlFile, '.html');
    const modelName = `rootLegacyHtml${fileName.replace(/[^a-zA-Z0-9]+/g, ' ')}`.replace(/\s+/g, '');
    const legacyHtml = await fs.readFile(rootLegacyHtmlFile, 'utf8');
    validateLegacySlideHtml(legacyHtml, modelName);
    validatedRootLegacyHtmlCount += 1;
  }

  if (errors.length > 0) {
    console.error(`Content model validation failed: ${errors.length} issue(s).`);
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }

  console.log('Content model validation passed.');
  console.log(
    `Validated models: home cards, IGCSE listing, IB 2027 indexes, ${validatedUnitPlanModels.join(', ')}, ${validatedUnitIndexModels.join(', ')}, ${validatedScenarioModels.join(', ')}, ${validatedOopProjectModels.join(', ')}, ${validatedSlideModels.join(', ')}, ${validatedAliasModels.join(', ')}, ${validatedIbLegacyModels.join(', ')}, ibLegacyHtml(${validatedIbLegacyHtmlCount}), igcseLegacyHtml(${validatedIgcseLegacyHtmlCount}), ks3LegacyHtml(${validatedKs3LegacyHtmlCount}), rootLegacyHtml(${validatedRootLegacyHtmlCount}).`
  );
};

run().catch((error) => {
  console.error('Failed to validate content models:', error);
  process.exit(1);
});
