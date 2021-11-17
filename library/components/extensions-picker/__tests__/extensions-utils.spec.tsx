import React from 'react';
import { processExtensionsValues, search } from '../extensions-utils';
import { ExtensionEntry } from '../extensions-picker';

const entries: ExtensionEntry[] = [
  {
    'id': 'io.quarkus:quarkus-arc',
    'name': 'ArC',
    'version': 'test-version',
    'tags': [],
    'keywords': [
      'arc',
      'cdi',
      'dependency-injection',
      'di',
      'label',
      'test'
    ],
    'default': false,
    'description': 'Build time CDI dependency injection',
    'shortName': 'CDI',
    'category': 'Core',
    'platform': true,
    'order': 0,
  },
  {
    'id': 'io.quarkus:quarkus-camel-netty4-http',
    'version': 'test-version',
    'name': 'Camel Netty4 test HTTP foo',
    'tags': [ 'preview', 'cdi', 'test' ],
    'default': false,
    'keywords': [
      'camel-netty4-http',
      'camel',
    ],
    'platform': true,
    'description': 'Camel support for Netty',
    'category': 'Integration',
    'order': 2,
  },
  {
    'id': 'io.bar:some-id-foo-bar',
    'version': 'test-version',
    'name': 'A CDI bob test',
    'tags': [ 'experimental' ],
    'default': false,
    'keywords': [
      'lambda',
      'amazon-lambda',
      'aws-lambda',
      'amazon',
      'aws',
      'label'
    ],
    'platform': false,
    'shortName': 'a shortname',
    'description': 'Some description',
    'category': 'Cloud',
    'order': 1,
  },
  {
    'id': 'io.ttt:arti',
    'version': 'test-version',
    'name': 'A Web cdi test 2',
    'tags': [ 'code' ],
    'default': false,
    'keywords': [
      'lambda',
      'amazon-lambda',
      'aws-lambda',
      'amazon',
      'aws',
    ],
    'platform': true,
    'shortName': 'a shortname 2',
    'description': 'Some description',
    'category': 'Web',
    'order': 3,
  }
];

const processedEntries = processExtensionsValues(entries);

describe('search', () => {
  it('"cdi bob in name" filters by name containing cdi',
    () => expect(search('cdi bob in name', processedEntries)).toEqual([ entries[2] ]));
  it('"foo in name,artifact-id" filters by name or artifact-id containing foo',
    () => expect(search('foo in name,artifact-id', processedEntries)).toEqual([ entries[1], entries[2] ]));
  it('"foo bar in:name,artifact-id" filters by name or artifact-id containing foo and bar',
    () => expect(search('foo bar in name,artifact-id', processedEntries)).toEqual([ entries[2] ]));
  it('"name:"A CDI bob test"" filters by name equals "A CDI bob test"',
    () => expect(search('name:"A CDI bob test"', processedEntries)).toEqual([ entries[2] ]));
  it('"cat:cloud" filters by category equals "cloud"',
    () => expect(search('cat:cloud', processedEntries)).toEqual([ entries[2] ]));
  it('"cat:cloud,integration" filters by category equals "cloud" or "integration"',
    () => expect(search('cat:cloud,integration', processedEntries)).toEqual([ entries[1], entries[2] ]));
  it('"tags:experimental" filters by tags contains "experimental"',
    () => expect(search('tags:experimental', processedEntries)).toEqual([ entries[2] ]));
  it('"tags:experimental,preview" filters by tags contains "experimental" or "preview',
    () => expect(search('tags:experimental,preview', processedEntries)).toEqual([ entries[1], entries[2] ]));
  it('"cdi in name; tags:experimental,preview" filters by tags contains "experimental" or "preview and cdi in name',
    () => expect(search('cdi in name; tags:experimental,preview', processedEntries)).toEqual([ entries[2] ]));
  it('"cdi in name tags:experimental,preview" filters by tags contains "experimental" or "preview and cdi in name',
    () => expect(search('cdi in name tags:experimental,preview', processedEntries)).toEqual([ entries[2] ]));
  it('"cdi" returns only the extension with cdi as shortName',
    () => expect(search('cdi', processedEntries)).toEqual([ entries[0] ]));
  it('"cdi test" is like "cdi test in name,shortname,keywords,tags,category"',
    () => expect(search('cdi test', processedEntries)).toEqual(entries));
});